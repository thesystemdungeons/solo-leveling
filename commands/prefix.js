const models = require('../modules/models.js');

module.exports.run = prefixCommand = (client, message, params, config) => {
    models.guildPrefix.findOne({ id: message.guild.id }, (err, res) => {
        let prefix = config.prefix;
        if (res) prefix = res.prefix;
        if (!params[0]) return message.channel.send(`\`❔\` Type \`${config.prefix}prefix <custom>\` to set prefix! My prefix for this server is, ${prefix}`);
        if (err) return console.log(err);
        if (!res) {
            let gPrefix = {
                id: message.guild.id,
                prefix: params[0]
            };
            models.guildPrefix(gPrefix).save().catch(err => { console.log(err); });
            message.channel.send(`\`ℹ\` Changed to, ${params[0]}`);
        } else {
            models.guildPrefix.replaceOne({ id: message.guild.id }, {
                id: message.guild.id,
                prefix: params[0] 
            }).exec( (err, res) => {
                if (err) return console.log(err);
                message.channel.send(`\`ℹ\` Updated to, ${params[0]}`);
            });
        }
    });
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    category: 'settings',
    name: 'prefix',
    description: 'Custom prefix.',
    usage: 'prefix <custom>'    
};
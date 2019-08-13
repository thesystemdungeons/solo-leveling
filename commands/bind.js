const models = require('../modules/models.js');

module.exports.run = bindCommand = (client, message, params, config) => {
    if (params[0] === 'disable') {
        models.guildBind.findOne({ id: message.guild.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                models.guildBind.replaceOne({ id: message.guild.id }, {
                    id: message.guild.id,
                    bindChannel: false
                }).exec( (err, res) => {
                    if (err) return console.log(err);
                    message.channel.send('\`ℹ\` Disabled.');
                });
            } else {
                message.channel.send(`\`❔\` Type \`${config.prefix}bind disable\` to disable. Usage \`bind <#channel>\``);
            }
        });
    } else {
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(`\`❔\` Type \`${config.prefix}bind disable\` to disable. Usage \`bind <#channel>\``);
        models.guildBind.findOne({ id: message.guild.id }, (err, res) => {
            if (err) return console.log(err);
            if (!res) {
                let gBind = {
                    id: message.guild.id,
                    bindChannel: channel.id
                };
                models.guildBind(gBind).save().catch(err => { console.log(err); });
                message.channel.send(`\`ℹ\` Changed to, ${channel}`);
            } else {
                models.guildBind.replaceOne({ id: message.guild.id }, {
                    id: message.guild.id,
                    bindChannel: channel.id
                }).exec( (err, res) => {
                    if (err) return console.log(err);
                    message.channel.send(`\`ℹ\` Updated to, ${channel}`);
                });
            }
        });
    }
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['bot'],
    permLevel: 2
};

module.exports.help = {
    category: 'settings',
    name: 'bind',
    description: 'Binds all bot commands! Commands can only be used in a specific channel.',
    usage: 'bind <#channel>'   
};
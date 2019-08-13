const models = require('../modules/models.js');

module.exports.run = welcomeCommand = (client, message, params, config) => {
    if (params[0] === 'disable') {
        models.guildWelcome.findOne({ id: message.guild.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                models.guildWelcome.replaceOne({ id: message.guild.id }, {
                    id: message.guild.id,
                    welcomeChannel: false
                }).exec( (err, res) => {
                    if (err) return console.log(err);
                    message.channel.send('\`ℹ\` Disabled.');
                });
            } else {
                message.channel.send(`\`❔\` Type \`${config.prefix}welcome disable\` to disable. Usage \`welcome <#channel> <message>\``);
            }
        });
    } else {
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(`\`❔\` Type \`${config.prefix}welcome disable\` to disable. Usage \`welcome <#channel> <message>\``);
        let msg = message.channel.type !== 'dm' ? params.join(' ').replace(channel, ''): '';
        models.guildWelcome.findOne({ id: message.guild.id }, (err, res) => {
            if (err) return console.log(err);
            if (!res) {
                let gWelcome = {
                    id: message.guild.id,
                    welcomeChannel: channel.id,
                    welcomeMessage: msg
                };
                models.guildWelcome(gWelcome).save().catch(err => { console.log(err); });
                message.channel.send(`\`ℹ\` Changed to, ${channel} ${msg}`);
            } else {
                models.guildWelcome.replaceOne({ id: message.guild.id }, {
                    id: message.guild.id,
                    welcomeChannel: channel.id,
                    welcomeMessage: msg
                }).exec( (err, res) => {
                    if (err) return console.log(err);
                    message.channel.send(`\`ℹ\` Updated to, ${channel} ${msg}`);
                });
            }
        });
    }
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    category: 'settings',
    name: 'welcome',
    description: 'Set welcome channel to welcome all new members.',
    usage: 'welcome <#channel> <message>'   
};
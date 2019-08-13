const Discord = require('discord.js');
const models = require('../modules/models.js');
 
module.exports.run = inviteCommand = (client, message, params, config, color) => {
    models.clientConfig.findOne({ id: client.user.id }, (err, res) => {
        if (err) return console.log(err);
        if (res) {
            client.generateInvite(res.invitePermissions).then(link => {
                const inviteEmbed = new Discord.RichEmbed()
                    .setColor(color)
                    .setDescription(`Click [here](${link})!`);
                message.channel.send({embed: inviteEmbed});
            });
        } else {
            let iPermissions = {
                id: client.user.id,
                invitePermissions: []
            };
            models.clientConfig(iPermissions).save().catch(err => { console.log(err); });
            message.channel.send('`⚠` Please use the command again!');
        }
    });
};
 
module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
 
module.exports.help = {
    category: '',
    name: 'invite',
    description: 'Invite the bot.',
    usage: 'invite'   
};
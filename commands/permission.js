// JavaScript Document
const Discord = require('discord.js');
const models = require('../modules/models.js');
const permsValidator = (client, message, config, color, invitePerms) => {
    const permissionEmbed = new Discord.RichEmbed();
    permissionEmbed.setTitle(client.user.username);
    permissionEmbed.setColor(color);
    permissionEmbed.setThumbnail(client.user.displayAvatarURL);
    let description = message.author.id === config.owner.id ? '`❔` Usage `permission <add/remove> <permission>.`': '';
    if (description !== '') permissionEmbed.setDescription(description);
    let iPerms = '';
    // console.log(invitePerms);
    if (invitePerms) {
        for (let i = 0; i < invitePerms.length; i++) {
            let emoji = message.channel.memberPermissions(client.user).has(invitePerms[i]) ? client.emojis.get('604636406907797525'): client.emojis.get('604636208680665089');
            iPerms += `${emoji} \`${invitePerms[i]}\`\n`;
        }
    }
    if (iPerms !== '') permissionEmbed.addField('Permissions', iPerms);
    permissionEmbed.setFooter(`Showing permissions for ${client.user.tag} in ${message.guild.name}!`, client.user.displayAvatarURL);
    message.channel.send({ embed: permissionEmbed });
};
const permissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'VIEW_CHANNEL',
    'READ_MESSAGES',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'EXTERNAL_EMOJIS',
    'USE_EXTERNAL_EMOJIS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_ROLES_OR_PERMISSIONS',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS' ];

module.exports.run = permissionsCommand = (client, message, params, config, color) => {
    if (!params[0]) {
        return models.clientConfig.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                permsValidator(client, message, config, color, res.invitePermissions);
            } else {
                let iPermissions = {
                    id: client.user.id,
                    invitePermissions: []
                };
                models.clientConfig(iPermissions).save().catch(err => { console.log(err); });
                message.channel.send('`⚠` Please use the command again!');
            }
        });
    }
    if (params[1] && message.author.id !== config.owner.id) return message.channel.send('`⚠` Only the bot developer can use this.');
    if (!params[1]) return message.channel.send(`\`⚠\` Invalid permission. Please try again! \`\`\`javascript\n${permissions.join('\n')}\`\`\``);
    let permission = params[1].toUpperCase();
    if (!permissions.includes(permission)) return message.channel.send(`\`⚠\` Invalid permission. Please try again! \`\`\`javascript\n${permissions.join('\n')}\`\`\``);
    if (params[0] === 'add') {
        models.clientConfig.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (!res) {
                let iPermissions = {
                    id: client.user.id,
                    invitePermissions: permission
                };
                models.clientConfig(iPermissions).save().catch(err => { console.log(err); });
                message.channel.send(`\`ℹ\` Added **${permission}**!`);
            } else if (res && res.invitePermissions.includes(permission)) {
                message.channel.send('`⚠` That permission already exist!');
            } else {
                models.clientConfig.updateOne({ id: client.user.id }, {
                    $push : {
                        invitePermissions: permission
                    }
                }).exec((err, res) => {
                    if (err) return console.log(err);
                    message.channel.send(`\`ℹ\` Added **${permission}**!`);
                });
            }
        });
    }
    if (params[0] === 'remove') {
        models.clientConfig.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (!res || !res.invitePermissions.includes(permission)) {
                userValidator(message, config, res);
            } else if (res && res.invitePermissions.includes(permission)) {
                models.clientConfig.updateOne({ id: client.user.id }, {
                    $pullAll : {
                        invitePermissions: [ permission ]
                    }
                }).exec((err, res) => {
                    if (err) return console.log(err);
                    message.channel.send(`\`ℹ\` Removed **${permission}**!`);
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
    category: 'info',
    name: 'permission',
    description: 'Display required bot permission!',
    usage: 'permission'   
};
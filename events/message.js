// JavaScript Document
const config = require('../config.json');
const settings = require('../modules/settings.js');

module.exports = async (client, message) => {
    if (message.guild && !message.channel.memberPermissions(client.user).has('SEND_MESSAGES')) return;
    if (message.content === 'sl.join' && message.author.id === config.owner.id) client.emit('guildMemberAdd', message.member);
    // Command Handler
    if (message.author.bot) return;
    if (message.isMentioned(client.user)) {
        if (message.channel.type !== 'dm') {
            let gPrefix = await settings.guildPrefix(message);
            if (gPrefix) {
                message.channel.send('`ℹ` My prefix for this server is,' + ` ${gPrefix}`);
            } else {
                message.channel.send('`ℹ` My prefix for this server is,' + ` ${config.prefix}`);
            }
        }
    }
    let prefix = config.prefix;
    if (!prefix) return console.warn('Config prefix must not be empty!');
    if (message.channel.type === 'dm') {
        client.handler(message, prefix);
    } else {
        let gPrefix = await settings.guildPrefix(message);
        if (gPrefix) prefix = gPrefix;
        client.handler(message, prefix);
    }
};
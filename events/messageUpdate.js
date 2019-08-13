const config = require('../config.json');
const settings = require('../modules/settings.js');

module.exports = async (client, oldMessage, newMessage) => {
    let prefix = config.prefix;
    if (!prefix) return console.warn('Config prefix must not be empty!');
    if (newMessage.channel.type === 'dm') {
        client.handler(newMessage, prefix);
    } else {
        let gPrefix = await settings.guildPrefix(newMessage);
        if (gPrefix) prefix = gPrefix;
        client.handler(newMessage, prefix);
    }
};
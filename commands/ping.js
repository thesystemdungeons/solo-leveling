module.exports.run = pingCommand = (client, message, params, config, color) => {
    message.channel.send(`Pong! Heartbeat ${Math.round(client.ping)}ms.`);
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

module.exports.help = {
    category: 'info',
    name: 'ping',
    description: 'Used to check if the bot is working.',
    usage: 'ping'
};
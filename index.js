// JavaScript Document
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
const mongodb = require('./database')();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.elevation = elevation = (message) => {
    if (!message.guild) return;
    let permlvl = 1;
    if (message.member.hasPermission('MANAGE_GUILD')) permlvl = 2;
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3;
    if (message.author.id === config.owner.id) permlvl = 4;
    return permlvl;
};
client.handler = handler = async (message, prefix) => {
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message);
    let color = message.channel.type !== 'dm' ? message.guild.me.displayHexColor: config.color;
    let cmd;
    if (client.commands.has(command)) cmd = client.commands.get(command);
    else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
    if (cmd) {
        let settings = require('./modules/settings.js');
        let channel = message.channel.type !== 'dm' ? await settings.guildBind(message): false;
        if (channel !== false && message.author.id !== config.owner.id && message.channel.id !== channel.id) return message.channel.send('`⚠` Please use, ' + channel);
        if (cmd.conf.enabled === false) return message.channel.send('`⚠` This command is disabled.');
        if (!message.guild && cmd.conf.guildOnly === true) return message.channel.send('`⚠` Not available in DM.');
        if (perms < cmd.conf.permLevel) return message.channel.send('`⚠` Not allowed to use this.');
        cmd.run(client, message, params, config, color);
    }
};
fs.readdir('./commands', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
fs.readdir('./events', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

const Token = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', (err) => { console.log(err.replace(Token, 'that was redacted.')); });
client.on('warn', (info) => { console.warn(`warn: ${info}`); });
client.on('error', (error) => { console.error(`client's WebSocket encountered a connection error: ${error}`); });
client.on('disconnect', () => { console.warn('Disconnected!'); });
client.on('reconnecting', () => { console.warn('Reconnecting...'); });
client.on('resume', (replayed) => { console.log(`client's WebSocket resumes, ${replayed} replays`); });
client.login(process.env.token);
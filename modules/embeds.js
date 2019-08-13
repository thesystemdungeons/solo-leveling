// JavaScript Document
const Discord = require('discord.js');
const cfHelp = '\n\`{user}\` - Mention the member.\n\`{user.id}\` - Member ID.\n\`{user.name}\` - Member name.\n\`{guild.id}\` - Guild ID.\n\`{guild.name}\` - Guild name.\n\`{guild.owner}\` - Mention the guild owner.\n\`{guild.owner.id}\` - Guild owner ID.\n\`{guild.owner.name}\` - Guild owner name.\n\`{guild.owner.tag}\` - Guild owner tag.\n\`{users}\` - User accounts size in the guild.\n\`{bots}\` - Bot accounts size in the guild.\n\`{members}\` - Members size in the guild.';
const input = 'Hello, {user}! Welcome to {guild.name}.';
const output = (message) => {
    return `Hello, ${message.author}! Welcome to ${message.guild.name}.`;
};

module.exports = {
    helpEmbed: (message, color, command, helpMessage, info, settings, tools) => {
        const helpEmbed = new Discord.RichEmbed();
        helpEmbed.setColor(color);
        helpEmbed.setDescription(helpMessage);
        if (info) helpEmbed.addField('Info', info);
        if (settings) helpEmbed.addField('Settings', settings);
        if (tools) helpEmbed.addField('Tools', tools);
        if (command === 'welcome') helpEmbed.addField('Custom Functions', cfHelp);
        if (command === 'welcome') helpEmbed.addField('Input (`e.g. Welcome Message`)', input);
        if (command === 'welcome') helpEmbed.addField('Output', output(message));
        message.channel.send({ embed: helpEmbed }).catch(err => { console.log(err); });
    }
};
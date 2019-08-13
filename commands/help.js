const embeds = require('../modules/embeds.js');

module.exports.run = helpCommand = (client, message, params, config, color) => {   
    let usage = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.help.usage}`);
    if (usage.length !== 0) {
        let category = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.help.category}`);
        let name = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.help.name}`);
        let description = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.help.description}`);
        let aliases = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => {
            if (cmd.conf.aliases[0]) return `${cmd.conf.aliases.join(', ')}`;
            else return `${cmd.conf.aliases}`;
        });
        let permLevel = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.conf.permLevel}`);
        let permission = 'Everyone';
        if (permLevel > 1) permission = 'Manage Server';
        if (permLevel > 2) permission = 'Administrator';
        if (permLevel > 3) permission = 'Bot Owner/Developer';
        let guildOnly = client.commands.filter(cmd => cmd.help.name === params[0]).map(cmd => `${cmd.conf.guildOnly}`);
        let helpMessage = `❔ Usage \`${config.prefix}${usage}\`\n\`\`\`javascript\nAliases: ${aliases}\nPermission: ${permission}\nGuild Only: ${guildOnly}\`\`\` \`\`\`javascript\nCategory: ${category}\nName: ${name}\nDescription: ${description}\`\`\``;
        embeds.helpEmbed(message, color, params[0], helpMessage);
    } else {
        let info = client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\`${cmd.help.name}\``).join(', ');
        let settings = client.commands.filter(cmd => cmd.help.category === 'settings').map(cmd => `\`${cmd.help.name}\``).join(', ');
        let tools = client.commands.filter(cmd => cmd.help.category === 'tools').map(cmd => `\`${cmd.help.name}\``).join(', ');
        let helpMessage = `If you need help about the command, just type \`${config.prefix}help <command>\` for more info.`;
        embeds.helpEmbed(message, color, params[0], helpMessage, info, settings, tools);
    }
    
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

module.exports.help = {
    category: 'info',
    name: 'help',
    description: 'Display all bot commands.',
    usage: 'help <command>'   
};
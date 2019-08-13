const settings = require('../modules/settings.js');
function customFunctions(member, message) {
    let msg = message.replace('{user}', member.user)
        .replace('{user.id}', member.user.id)
        .replace('{user.name}', member.user.username)
        .replace('{guild.id}', member.guild.id)
        .replace('{guild.name}', member.guild.name)
        .replace('{guild.owner}', member.guild.owner.user)
        .replace('{guild.owner.id}', member.guild.owner.user.id)
        .replace('{guild.owner.name}', member.guild.owner.user.username)
        .replace('{guild.owner.tag}', member.guild.owner.user.tag)
        .replace('{users}', member.guild.members.filter(m => !m.user.bot).size)
        .replace('{bots}', member.guild.members.filter(m => m.user.bot).size)
        .replace('{members}', member.guild.memberCount);
    return msg;
};

module.exports = async (client, member) => {
    let welcome = await settings.guildWelcome(member);
    if (welcome) {
        let channel = member.guild.channels.get(welcome[0].channel);
        if (channel) {
            channel.send(customFunctions(member, welcome[0].message));  
        }
    }
};
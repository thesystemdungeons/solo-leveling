// JavaScript Document
const fs = require('fs');
const config = require('../config.json');

module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag} in ${client.guilds.size} servers!`);
    client.user.setStatus('dnd').catch(O_o=>{});
    try {
        let statusChannel = client.channels.get(config.server.status.channel.id);
        let t = new Date, tformat = [t.getMonth()+1, t.getDate(), t.getFullYear()].join('/')+' '+ [t.getHours(), t.getMinutes(), t.getSeconds()].join(':');
        let botStatus = await statusChannel.send('**~~(LOADING COMMANDS)~~ | Connected to database.**');
        botStatus.edit('**(ONLINE) | Watching** Hunters on (' + `\`\`${client.guilds.size}\`\`` + ') gates!' + `\`\`\`\md\n#${t}\`\`\``);
    } catch (err) {
        console.warn('Failed to send status! ' + err);
    }
};
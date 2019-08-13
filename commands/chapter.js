// JavaScript Document
const Discord = require('discord.js');
const models = require('../modules/models.js');
function currentChaptersEmbed(client, message, config, color, chapters) {
    const embed = new Discord.RichEmbed();
    embed.setTitle('Solo Leveling');
    embed.setURL('https://jaiminisbox.com/reader/series/solo-leveling/');
    embed.setThumbnail('https://i0.wp.com/jaiminisbox.com/reader/content/comics/solo-leveling_5c5b0f9edeb41/31477v2.jpg');
    embed.setColor(color);
    chapters[0] ? embed.addField('Chapters', chapters.join(', ')): embed.setDescription('No chapters found.');
    message.channel.send({ embed: embed });
};
function chapterEmbed(client, message, config, color, chapter, currentChapter) {
    const embed = new Discord.RichEmbed();
    embed.setTitle('Solo Leveling');
    embed.setURL('https://jaiminisbox.com/reader/series/solo-leveling/');
    embed.setThumbnail('https://i0.wp.com/jaiminisbox.com/reader/content/comics/solo-leveling_5c5b0f9edeb41/31477v2.jpg');
    embed.setColor(color);
    embed.setDescription(`**Chapter ${chapter}** - ${currentChapter ? `[Jaimini's Box](https://jaiminisbox.com/reader/read/solo-leveling/en/0/${chapter}/page/1)`: 'No available links found.'}`);
    message.channel.send({ embed: embed });
};
function currentChaptersUpdate(client, message) {
    let cChapters = {
        id: client.user.id,
        currentChapters: [],
    };
    models.clientManhwa(cChapters).save().catch(err => { console.log(err); });
    message.channel.send('`⚠` Please use the command again!');
};

module.exports.run = chaptersCommand = (client, message, params, config, color) => {
    if (!params[0]) {
        return models.clientManhwa.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                currentChaptersEmbed(client, message, config, color, res.currentChapters);
            } else {
                currentChaptersUpdate(client, message);
            }
        });
    }
    let chapter = params[1] ? params[1]: params[0];
    if (isNaN(chapter)) return message.channel.send('\`⚠\` Invalid chapter. Please try again!');
    if (params[0] === 'add') {
        if (!config.staffs.includes(message.author.id)) return message.channel.send('`⚠` Only the bot developer or staffs can use this.');
        models.clientManhwa.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                if (res.currentChapters.includes(chapter)) {
                    message.channel.send('`⚠` That chapter already exist!');
                } else {
                    models.clientManhwa.updateOne({ id: client.user.id }, {
                        $push : {
                            currentChapters: chapter
                        }
                    }).exec((err, res) => {
                        if (err) return console.log(err);
                        message.channel.send(`\`ℹ\` Added **Chapter ${chapter}**!`);
                    });
                }
            } else {
                currentChaptersUpdate(client, message);
            }
        });
    } else if (params[0] === 'remove') {
        if (!config.staffs.includes(message.author.id)) return message.channel.send('`⚠` Only the bot developer or staffs can use this.');
        models.clientManhwa.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                if (res.currentChapters.includes(chapter)) {
                    models.clientManhwa.updateOne({ id: client.user.id }, {
                        $pullAll : {
                            currentChapters: [ chapter ]
                        }
                    }).exec((err, res) => {
                        if (err) return console.log(err);
                        message.channel.send(`\`ℹ\` Removed **Chapter ${chapter}**!`);
                    });
                } else {
                    message.channel.send('`⚠` That chapter doesn\'t exist!');
                }
            } else {
                currentChaptersUpdate(client, message);
            }
        });
    } else {
        models.clientManhwa.findOne({ id: client.user.id }, (err, res) => {
            if (err) return console.log(err);
            if (res) {
                let currentChapter = res.currentChapters.includes(chapter) ? chapter: '';
                chapterEmbed(client, message, config, color, chapter, currentChapter);
            } else {
                currentChaptersUpdate(client, message);
            }
        });
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
    name: 'chapter',
    description: 'Search for Solo Leveling chapter or display current chapters if no specific chapter provided!',
    usage: 'chapter <number>'   
};
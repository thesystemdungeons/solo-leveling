// JavaScript Document
const models = require('../modules/models.js');

module.exports = {
    guildPrefix: async (message) => {
        let prefix = [];
        await models.guildPrefix.findOne({ id: message.guild.id }, (err, res) => {
            if (err) console.log(err);
            if (res) {
                prefix.push(res.prefix);
            }
        });
        let gPrefix = prefix[0];
        if (gPrefix) return gPrefix;
        else return false;
    },
    guildBind: async (message) => {
        let id = [];
        await models.guildBind.findOne({ id: message.guild.id }, (err, res) => {
            if (err) console.log(err);
            if (res) {
                id.push(res.bindChannel);
            }
        });
        let channel = message.guild.channels.get(id[0]);
        if (channel) return channel;
        else return false;
    },
    guildWelcome: async (member) => {
        let welcome = [];
        await models.guildWelcome.findOne({ id: member.guild.id }, (err, res) => {
            if (err) console.log(err);
            if (res) {
                welcome.push({
                    channel: res.welcomeChannel,
                    message: res.welcomeMessage
                });
            }
        });
        let channel = member.guild.channels.get(welcome[0].channel);
        // console.log(welcome);
        if (channel) return welcome;
        else return false;
    }
};
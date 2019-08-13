// JavaScript Document
const mongoose = require('mongoose');
 
module.exports = {
    clientConfig: mongoose.model('clientconfigs', {
        id: String,
        invitePermissions: Array
    }),
    clientManhwa: mongoose.model('clientmanhwas', {
        id: String,
        currentChapters: Array
    }),
    guildPrefix: mongoose.model('guildprefixes', {
        id: String,
        prefix: String
    }),
    guildBind: mongoose.model('guildbinds', {
        id: String,
        bindChannel: String
    }),
    guildWelcome: mongoose.model('guildwelcomes', {
        id: String,
        welcomeChannel: String,
        welcomeMessage: String
    })
};
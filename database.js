const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.dbUri, {
        useNewUrlParser: true,
        auth: {
            user: process.env.dbUser,
            password: process.env.dbPassword
        }
    });
  
    let db = mongoose.connection;    
    db.on('error', console.error.bind(console, 'Connection error:'));   
    db.once('open', () => {
        console.log('Connected to database.');                     
    });
};
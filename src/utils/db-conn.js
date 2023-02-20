const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zkuads');

const db = mongoose.connection;
db.on('connected', () => {
    console.log('db connection success.');
})
db.on('error', () => {
    console.log('db connection error.');
})


module.exports = mongoose;
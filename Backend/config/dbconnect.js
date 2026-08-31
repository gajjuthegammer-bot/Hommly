const mongoose = require('mongoose');


async function dbconnect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/skywin')

}
module.exports = dbconnect; 
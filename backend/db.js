require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
    username : String,
    password : String
})

const URLSchema = new mongoose.Schema({
    shortId : String,
    redirectURL : {
        type: String,
        required : true
    },
    visitHistory : [{
        timestamp : Date,
        deviceType : String,
        ip : String
    }],
    clicks : {
        type : Number,
        default : 0
    },
    expiryDate : Date,
    createdAt : Date
},{ timestamps : true});

const dailyStatsSchema = new mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    totalClicks : {
        type : Number,
        default : 0
    }
});

const deviceStatsSchema = new mongoose.Schema({
    deviceType : {
        type : String,
        required : true
    },
    count : {
        type : Number,
        default : 0
    }
})

const User = mongoose.model('User', UserSchema);
const URL = mongoose.model('URL', URLSchema);
const dailyStats = mongoose.model('DailyStats', dailyStatsSchema);
const deviceStats = mongoose.model('DeviceStats', deviceStatsSchema);

module.exports = {User, URL, dailyStats, deviceStats};

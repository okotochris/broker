const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    fullname:String,
    password:String,
    email:String,
    amountInvest:String,
    totalProfit:String,
    privateKey:String,
    publicKey:String,
    coinName:String,
}, {timestamps:true})

const User = mongoose.model("user", userModel)
module.exports = User;
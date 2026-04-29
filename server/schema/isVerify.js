const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
        email:String,
        code:String,
        data:{
            name:String,
            password:String,
            email:String,
            role: {
                type: String,
                default: 'user'
            },
        }
    
}, {timestamps:true})

const isVerify = mongoose.model('isVerify', userModel)
module.exports = isVerify
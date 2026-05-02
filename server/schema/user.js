const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    name:String,
    password:String,
    email:{
        type:String,
        unique:true,
        require:true,
    },
    role: {
        type: String,
        default: 'user'
    },
    accountType:{
        type:String,
        default:"Starter"
    },
    coin:String,
    coninValue:{
        type:Number,
        default:0.00
    },
     amountInvest:{
        type:Number,
        default:0.00
    },
    totalProfit:{
        type:Number,
        default:0.00
    },
    investment:
        {
        amountInvest:{
            type:Number,
            default:0
        },
        totalProfit:{
            type:Number,
            default:0
        },
        usdValue:{
            type:Number,
            default:0
        },
        ethValue:{
            type:Number,
            default:0   
        },
        btcValue:{
            type:Number,
            default:0
        }
        }
    ,
    privateKey:String,
    publicKey:String,
    
}, {timestamps:true})

const User = mongoose.model("user", userModel)
module.exports = User;
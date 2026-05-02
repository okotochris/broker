require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const cron = require('node-cron')
const User = require('./schema/user')
const sendEmail = require('./email/resend')
const app = express()
const  axios = require('axios');
const IsVerify = require('./schema/isVerify')
//MIDLEWARE
app.use(express.json())
app.use(cors())

const mongoseString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb'
mongoose.connect(mongoseString)
.then(result=>{
    console.log("Mongoose connected")
})
.catch(err=>{
    console.log(err)
})

// cron.schedule('0 0 * * 0', async () => {
//   try {
//     // 1. Fetch live prices
//     const priceRes = await fetch(
//       'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
//     );

//     let btcPrice = 0;
//     let ethPrice = 0;

//     if (priceRes.ok) {
//       const priceData = await priceRes.json();
//       btcPrice = priceData.bitcoin?.usd || 0;
//       ethPrice = priceData.ethereum?.usd || 0;
//     } else {
//       throw new Error('Could not fetch prices for profit calculation');
//     }

//     const users = await User.find();

//     for (const user of users) {
//       // 2. Access the investment object directly (No more array loop)
//       const inv = user.investment;
//       if (!inv) continue;

//       // 3. Calculate the current USDT value of all holdings
//       const totalInvestedValue =
//         (inv.usdValue || 0) +
//         (inv.btcValue || 0) * btcPrice +
//         (inv.ethValue || 0) * ethPrice;

//       // 4. Calculate 12% profit based on that total value
//       const weeklyProfit = totalInvestedValue * 0.12;

//       // 5. Add that profit to the existing totalProfit field
//       user.investment.totalProfit = (inv.totalProfit || 0) + weeklyProfit;

//       // 6. Save the user document
//       await user.save();
//     }

//     console.log(`Weekly 12% profit processed for ${users.length} users.`);
//   } catch (err) {
//     console.error('Error in weekly profit cron job:', err);
//   }
// });


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email, password });
    if (!user) {
      // Use a generic message to prevent account enumeration
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // // 2. Compare passwords
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if (!isPasswordCorrect) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // 3. Send back specific user data (EXCLUDE the password)
    res.status(200).json({ 
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
         investment:user.investment
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // 4. Generate OTP (THIS is the one you send)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    // 5. Create user
    const newUser = new IsVerify({
     code:otp,
     email:email,
     data:{
      name: fullname,
      email,
      password,
      role:'user',
     }
    });

    await newUser.save();

    // 6. Send OTP via StudyNest server
    // await axios.post(
    //   "https://studynest.com.ng/send-otp",
    //   {
    //     userEmail: email,
    //     companyName: "Capitextradecompany", // your current app name
    //     userCode: otp
    //   }
    // );
    sendEmail(email, otp)
    res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/signup/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    // 1. Find and validate the temporary user
    const tempUser = await IsVerify.findOne({ email, code:otp });


    if (!tempUser) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }

    // 2. Create the permanent user (Avoid duplicate 'email' variable)
    const { name, password, role } = tempUser.data;
    const newUser = new User({ name, password, email, role });
    
    await newUser.save();
    const user = await User.findOne({email:email})

    // 3. Clean up: Delete from temp storage after verification
    await IsVerify.deleteOne({ _id: user._id });

    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const data = await User.find().select('-password -__v');
    res.status(200).json({ users: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Super Admin: list all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch users' });
  }
});

// Super Admin: update user balances (usdValue, btcValue, ethValue)
app.put('/api/users/:id/sync-investment', async (req, res) => {
  const { id } = req.params;
  const { 
    password, 
    amountInvest, 
    totalProfit, 
    accountType, 
    coin // This is your string
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 1. Update String fields
    if (password !== undefined) user.password = password;
    if (accountType !== undefined) user.accountType = accountType;
    
    // Explicitly update the coin string
    if (coin !== undefined) user.coin = String(coin); 

    // 2. Update Numeric fields
    user.amountInvest = Number(amountInvest ?? user.amountInvest) || 0;
    user.totalProfit = Number(totalProfit ?? user.totalProfit) || 0;

    await user.save();
    
    res.status(200).json({ 
      message: 'User updated successfully', 
      user: {
        email: user.email,
        coin: user.coin, // Verified as string
        amountInvest: user.amountInvest,
        totalProfit: user.totalProfit
      }
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Super Admin: delete user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to delete user' });
  }
});

// Get user by ID
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch user' });
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
})
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const cron = require('node-cron')
const User = require('./schema/user')
const sendEmail = require('./email/brevo')
const app = express()
const  axios = require('axios');
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

cron.schedule('0 0 * * 0', async () => {
  try {
    // Fetch prices
    const priceRes = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    );

    let btcPrice = 0;
    let ethPrice = 0;

    if (priceRes.ok) {
      const priceData = await priceRes.json();
      btcPrice = priceData.bitcoin?.usd || 0;
      ethPrice = priceData.ethereum?.usd || 0;
    }

    const users = await User.find();

    for (const user of users) {
      if (!user.investment || user.investment.length === 0) continue;

      for (const inv of user.investment) {
        // ✅ Convert total investment to USDT
        const totalValue =
          (inv.usdValue || 0) +
          (inv.btcValue || 0) * btcPrice +
          (inv.ethValue || 0) * ethPrice;

        // ✅ Calculate 12% profit
        const profit = totalValue * 0.12;

        // ✅ Add ONLY to profit (NOT investment)
        inv.totalProfit = (inv.totalProfit || 0) + profit;
      }

      await user.save();
    }

    console.log('Weekly 12% profit added correctly');
  } catch (err) {
    console.error('Error adding weekly profit:', err);
  }
});


app.post('/api/login/request-otp', async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 3. Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // 4. Send OTP email
    const msg = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Login to Capitextradecompany</h2>
        <p>Your one-time password (OTP) is:</p>
        <h1 style="color: #f97316; font-size: 32px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `;
    await sendEmail(email, msg);

    res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/login/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if verified
    if (!user.verified) {
      return res.status(403).json({ message: "Account not verified. Please verify your email first." });
    }

    // 3. Check OTP
    if (!user.otp || user.otp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    // 3. Check expiry
    if (new Date() > user.otpExpiry) {
      return res.status(403).json({ message: "OTP expired" });
    }

    // 4. Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        investment: user.investment
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/api/signup/request-otp', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
console.log(req.body)
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Determine role
    const role = email === 'admin@capitextradecompany.com' ? 'admin' : 'user';

    // 4. Generate OTP (THIS is the one you send)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // 5. Create user
    const newUser = new User({
      name: fullname,
      email,
      password: hashedPassword,
      role,
      verified: false,
      otp,
      otpExpiry,
      investment: [
        {
          amountInvest: 0,
          totalProfit: 0,
          usdValue: 0,
          ethValue: 0,
          btcValue: 0,
        }
      ]
    });

    await newUser.save();

    // 6. Send OTP via StudyNest server
    await axios.post(
      "https://studynest.com.ng/send-otp",
      {
        userEmail: email,
        companyName: "Capitextradecompany", // your current app name
        userCode: otp
      }
    );

    res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/signup/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if already verified
    if (user.verified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // 3. Check OTP
    if (!user.otp || user.otp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    // 4. Check expiry
    if (new Date() > user.otpExpiry) {
      return res.status(403).json({ message: "OTP expired" });
    }

    // 5. Verify user
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Account verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        investment: user.investment
      }
    });

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
    const users = await User.find().select('-password -__v');
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch users' });
  }
});

// Super Admin: update user balances (usdValue, btcValue, ethValue)
app.put('/api/users/:id/balance', async (req, res) => {
  const { id } = req.params;
  const { usdValue, btcValue, ethValue } = req.body;

  if (usdValue == null || btcValue == null || ethValue == null) {
    return res.status(400).json({ message: 'usdValue, btcValue and ethValue are required' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.investment || user.investment.length === 0) {
      user.investment = [{ amountInvest: 0, totalProfit: 0, usdValue: 0, ethValue: 0, btcValue: 0 }];
    }

    user.investment[0].usdValue = Number(usdValue);
    user.investment[0].btcValue = Number(btcValue);
    user.investment[0].ethValue = Number(ethValue);
    user.investment[0].amountInvest = Number(usdValue); // USDT invested amount

    await user.save();

    res.status(200).json({ message: 'User balance updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to update balance' });
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
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch user' });
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
   
})
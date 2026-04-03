require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const cron = require('node-cron')
const User = require('./schema/user')
const app = express()

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


app.post('/api/login', async (req, res) => {
  const result = await User.find()

  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect password" });
    }
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


app.post('/api/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Determine role
    const role = email === 'admin@broker.com' ? 'admin' : 'user';

      const newUser = new User({
      name: fullname,
      email,
      password: hashedPassword,
      role,
      investment: [
        {
          amountInvest: 0,
          totalProfit: 0,
          usdValue: 0,
          ethValue:0,
          btcValue:0,
        }
      ]
    });

    await newUser.save();

    // 4. Remove password before sending response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      investment: newUser.investment
    };

    res.status(200).json({
      message: "Signup successful",
      user: userResponse
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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
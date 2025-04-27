require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const UserModel = require('./model/User');

const app = express();
const PORT = process.env.PORT || 3001;

// 1) parse JSON bodies
app.use(express.json());
// 2) allow your React app (port 3000) to hit this API
app.use(cors({ origin: process.env.FRONTEND_URL }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB man'))
.catch(err => console.error('Mongo connection error:', err));

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (await UserModel.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await new UserModel({ name, email, password: hash }).save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (e) {
    console.error('Signup error:', e);
    res.status(500).json({ message: e.message });
  }
});

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            const passwordMtach = await bcrypt.compare(password, user.password);
            if(passwordMtach){
                res.json("success")
            }
            else{
                res.status(401).json("Password does not match!")
            }
    
        }else{
            res.status(401).json("No Records found")
        }

    }catch(error){
        res.status(500).json({error:error.message})
    }
   
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');


const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("Signup route hit!"); 
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

    console.log("Saving user to DB:", user);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: "success", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
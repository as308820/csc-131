const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("Signup route hit!"); 
    try {

        const { name, email, password, adminCode } = req.body; 

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (await UserModel.findOne({ email })) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const hash = await bcrypt.hash(password, 10);
        const isAdmin = adminCode === process.env.ADMIN_CODE;

        const user = await new UserModel({
            name,
            email,
            password: hash,
            isAdmin
        }).save();

        console.log("Saving user to DB:", user);
        console.log("Admin code from .env:", process.env.ADMIN_CODE);
        console.log("Admin code from form:", req.body.adminCode);

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
            const token = jwt.sign(
                { userId: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax', 
                secure: process.env.NODE_ENV === 'production'
            });
            res.json({ message: "success", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Login error:', error);  // Add this line!
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
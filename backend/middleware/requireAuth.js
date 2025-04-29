const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model

async function requireAuth(req, res, next) {
    console.log("Cookies received:", req.cookies);  // 👈 Log incoming cookies

    const token = req.cookies.token;
    if (!token) {
        console.log("No token found.");
        return res.status(401).json({ message: 'Unauthorized (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);  // 👈 Log decoded JWT

        const user = await User.findById(decoded.userId).select('_id email isAdmin');
        if (!user) {
            console.log("User not found in DB.");
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(401).json({ message: 'Unauthorized (invalid token)' });
    }
}

module.exports = requireAuth;
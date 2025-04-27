module.exports = (req, res, next) => {
    const user = req.body.user || {}; // Placeholder (until JWT or session is wired)
  
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required.' });
    }
  
    next();
  };
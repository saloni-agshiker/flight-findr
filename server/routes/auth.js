const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// creates mini Express app (group of routes related to authentication)
const router = express.Router();

// Signup route - when server receives POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, name: name || "" });

    return res.status(201).json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Login route - when server receives POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
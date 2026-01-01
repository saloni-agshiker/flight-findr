const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// creates mini Express app (group of routes related to authentication)
const router = express.Router();

// simple authentication/verification middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Update route - when server receives PATCH /api/users/me
router.patch("/me", requireAuth, async (req, res) => {
    try {
        const allowedFields = [
        "name",
        "college",
        "residence",
        "year",
        "bio",
        "languages",
        //"profilePic",
        ];

        const updates = {};
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const user = await User.findByIdAndUpdate(
            req.userId,           
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Server error", detail: err.message });
    }
}

);

module.exports = router;
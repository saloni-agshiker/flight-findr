const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Trip = require("../models/Trip");

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
    return res.status(401).json({ message: err.message });
  }
}

// GETS the trips associated with the user_id
router.get("/trips", async (req, res) => {
    try {    
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "userID is required"});
        }
        const trips = await Trip.find({ userId: userId });
        return res.json(trips);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error"});
    }
});

// CREATES a trip associated with the user_id
router.post("/trips", async (req, res) => {
    try {
        const { airline, flightNum, depAirport, arrAirport, transportMode, addNotes } = req.body;
        if (!airline || !flightNum || !depAirport || !arrAirport || transportMode == null) return res.status(400).json({ message: "Required info is missing."});
        
        console.log(req.userId);
        const user = await User.find({ userId: req.userId });
        if (!user) return res.status(401).json({ message: "User not found" });

        const trip = Trip.create({ userId: req.userId, airline, flightNum, depAirport, arrAirport, transportMode, addNotes });
        return res.status(201).json({
           trip
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
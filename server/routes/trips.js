const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");


// creates mini Express app (group of routes related to authentication)
const router = express.Router();

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

module.exports = router;
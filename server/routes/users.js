const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// creates mini Express app (group of routes related to authentication)
const router = express.Router();

// Signup route - when server receives POST /api/auth/signup
router.patch("/me", async (req, res) => {}

);

module.exports = router;
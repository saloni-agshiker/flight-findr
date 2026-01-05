require("dotenv").config();   // loads environment variables

// import core dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");
const browseRoutes = require("./routes/matches");

// creates Express app server instance
const app = express();

// enables middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// registers routes
app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/matches", browseRoutes);


// connects to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo connection error:", err));
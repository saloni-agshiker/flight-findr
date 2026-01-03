const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        airline: { type: String, required: true, default: "" },
        flightNum: { type: String, required: true, default: "" },
        depAirport: { type: String, required: true, default: "", index: true },
        arrAirport: { type: String, required: true, default: "", index: true },
        //depAt: { type: Date, required: true, index: true },
        //arrAt: { type: Date, required: true, index: true },
        //timeDepToAirport: { type: Number, required: true },
        transportMode: { 
            type: String,
            enum: ["Personal car", "Rideshare", "Public transit", "Other"],
            required: true,
            index: true
        },
        addNotes: { type: String, required: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
const mongoose = require("mongoose");


const TravelSchema = new mongoose.Schema({
    country: {
        type: String, 
        required: true,
    },
    transportationType: [
        {
            type: { type: String },
            description: String,
        }
    ],
    image:{
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("travelModel", TravelSchema);
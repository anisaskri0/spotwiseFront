const mongoose = require("mongoose");

const spotdataSchema = new mongoose.Schema({
    blockName: {
        type: String,
        required: true
    },
    spotNumber: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "spotDATA" });

const SpotData = mongoose.model("Data", spotdataSchema);

module.exports = SpotData;

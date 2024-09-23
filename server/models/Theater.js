const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheaterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    ticketPrice: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Theater', TheaterSchema);
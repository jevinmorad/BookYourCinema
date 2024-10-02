const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        require: true
    },
    trailerUrl: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    cast: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    releaseDate: {
        type: Date,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        require: true
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reservation',
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShowtimeSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    screens: [
        {
            screenId: {
                type: String,
                required: true
            },
            totalSeats: {
                type: Number,
                required: true
            },
            seatingLayout: {
                type: [Schema.Types.Mixed],
                required: true,
            }
        }
    ],
    showDate: {
        type: Date,
        required: true
    },
    showTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Showtime', ShowtimeSchema);
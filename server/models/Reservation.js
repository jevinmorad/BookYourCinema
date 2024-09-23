const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        require: true
    },
    showtimeId: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    seats: {
        type: [Schema.Types.Mixed],
        required: true,
    },
    totalPrice: {
        type: Number,
        required:
            true
    },
    checkIn: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', BookingSchema);  
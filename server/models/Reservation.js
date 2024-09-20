const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

// Create reservation
exports.createReservation = async (req, res) => {
    const session = await mongoose.startSession(); // Start a session for transactions
    try {
        session.startTransaction();

        const user = await User.findById(req.body.users).session(session);
        const movie = await Movie.findById(req.body.movies).session(session);

        // Create a new reservation
        const reservation = new Reservation(req.body);
        await reservation.save({ session });

        // Update movie
        movie.bookings.push(reservation._id);
        await movie.save({ session });

        // Update user
        user.bookings.push(reservation._id);
        await user.save({ session });

        // Commit the transaction after all successful operations
        await session.commitTransaction();
        res.status(201).send(reservation);

    } catch (err) {
        await session.abortTransaction();
        res.status(500).send(err.message);
    } finally {
        session.endSession(); // End the session
    }
}

// Get all reservation of user
exports.getReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const reservations = await Reservation.find({user: id});
        res.send(reservations);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Check in
exports.checkIn = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) res.status(404).send('Reservation not found.');

        reservation.checkIn = true;
        await reservation.save();
        res.send('Check in successfully')
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

// Update reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) res.status(404).send('Reservation not found');

        Object.assign(reservation, req.body);
        res.send(reservation);
    } catch (err) {
        res.send(500).send(err.message);
    }
}

// Delete reservation
exports.deleteReservation = async (req, res) => {
    const session = await mongoose.startSession(); // start a session for a transaction
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id).populate("users movies");
        if (!reservation) {
            res.status(404).send("Reservation not found");
        }

        session.startTransaction();

        // Remove bookings id from User
        await reservation.users.bookings.pull(reservation);
        await reservation.users.save({ session });

        // Remove bookings id from Movie
        await reservation.movies.bookings.pull(reservation);
        await reservation.movies.save({ session });

        // Commit the transaction after all successful operations
        await session.commitTransaction();

        res.send(`Reservations for ${reservation.users.name} deleted`);
    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        res.status(500).send(err.message);
    } finally {
        session.endSession(); // End the session
    }
}
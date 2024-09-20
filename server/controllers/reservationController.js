const Reservation = require('../models/Reservation')

// Create reservation
exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.send(reservation);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Get reservation
exports.getReservation = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.send(reservations);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Search reservation
exports.searchReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if(!reservation) res.status(404).send('Reservation not found.');
        res.send(reservation);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.checkIn = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if(!reservation) res.status(404).send('Reservation not found.');
        
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
        if(!reservation) res.status(404).send('Reservation not found');
        
        Object.assign(reservation, req.body);
        res.send(reservation);
    } catch (err) {
        res.send(500).send(err.message);
    }
}

// Delete reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) res.status(404).send("Reservation not found");
        res.send(`Reservations for ${reservation.userId} deleted`);
    } catch (err) {
        res.send(500).send(err.message);
    }
}
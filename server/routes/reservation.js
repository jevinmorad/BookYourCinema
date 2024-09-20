const express = require('express');
const { createReservation, getReservation, searchReservation, checkIn, updateReservation, deleteReservation } = require('../controllers/reservationController');

const route = express.Router();

// Create reservation
route.post('/', createReservation);

// Get reservations
route.get('/', getReservation);

// Search reservation
route.get('/:id', searchReservation);

// Check in 
route.get('/checkIn/:id', checkIn);

// Update reservation
route.patch('/:id', updateReservation);

// Delete reservation
route.delete('/:id', deleteReservation);

module.exports = route
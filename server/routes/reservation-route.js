const express = require('express');
const { createReservation, getReservation, searchReservation, checkIn, updateReservation, deleteReservation } = require('../controllers/reservation-controller');

const route = express.Router();

// Create reservation
route.post('/', createReservation);

// Get reservations
route.get('/:id', getReservation);

// Check in 
route.get('/checkIn/:id', checkIn);

// Update reservation
route.patch('/:id', updateReservation);

// Delete reservation
route.delete('/:id', deleteReservation);

module.exports = route
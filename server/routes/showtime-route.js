const express = require('express');
const { addShowtime, getShowtime, searchShowtime, updateShowtime, deleteShowtime } = require('../controllers/showtime-controller');

const route = express.Router();

// Add showtime
route.post('/', addShowtime)

// Get all show
route.get('/', getShowtime)

// Search showtime
route.get('/:id', searchShowtime)

// Update showtime
route.patch('/:id', updateShowtime)

// Delete showtime
route.delete('/:id', deleteShowtime)

module.exports = route
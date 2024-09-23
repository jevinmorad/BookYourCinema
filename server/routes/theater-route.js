const express = require('express')
const { addTheater, getTheater, searchTheater, deleteTheater, updateTheater } = require('../controllers/theater-controller')

const route = express.Router()

// Add theater
route.post('/', addTheater);

// Get theater
route.get('/', getTheater);

// Search theater
route.get('/:id', searchTheater);

// Update theater
route.patch('/:id', updateTheater);

// Delete theater
route.delete('/:id', deleteTheater);

module.exports = route
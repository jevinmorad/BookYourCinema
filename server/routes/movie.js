const express = require('express');
const {getMovies, addMovie, deleteMovie, searchMovie } = require('../controllers/movieController');
const router = express.Router();

// Get all movies
router.get('/', getMovies);

// Add movie
router.post('/', addMovie);

// Delete movie
router.delete('/:name', deleteMovie);

// Search movie
router.get('/:name', searchMovie);

module.exports = router;
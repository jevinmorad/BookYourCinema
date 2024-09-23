const express = require('express');
const {getMovies, addMovie, deleteMovie, searchMovie, updateMovie } = require('../controllers/movie-controller');
const router = express.Router();

// Add movie
router.post('/', addMovie);

// Get all movies
router.get('/', getMovies);

// Search movie
router.get('/:id', searchMovie);

// Update movie
router.patch('/:id', updateMovie)

// Delete movie
router.delete('/:id', deleteMovie);

module.exports = router;
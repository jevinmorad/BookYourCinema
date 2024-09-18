const Movie = require('../models/Movie')


// Add movie
exports.addMovie = async (req, res) => {
    const newMovie = new Movie(req.body);
    try {
        await newMovie.save();
        res.send(newMovie);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.send(movies);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

// Search movie
exports.searchMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) res.status(404).send("Movie not found");
        res.send(movie);
    }
    catch (err) {
        res.status(f00).send(err.message);
    }
}

// Update movie
exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) res.status(404).send("Movie not found");
        
        Object.assign(movie, req.body)
        await movie.save();
        res.send("Updated "+movie.title)
    } catch (err) {
        res.status(500).send(err.message);
    }
}


// Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id)
        if (!deleteMovie) res.status(404).send("Movie not found");
        res.send(`${deleteMovie.name}: deleted`);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
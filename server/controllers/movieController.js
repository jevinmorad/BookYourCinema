const Movie = require('../models/Movie')

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

// Add movie
exports.addMovie = async (req, res) => {
    try {
        newMovie = new Movie({ ...req.body })
        const data = await newMovie.save();
        res.json(newMovie);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

// Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        const name = req.params.name;

        const deleteMovie = await Movie.findOneAndDelete({title: name})

        if (!deleteMovie) {
            res.status(404).json({message: 'Movie not found'});
        }

        res.send(`${name}: deleted`);
    }
    catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}

// Search movie
exports.searchMovie = async (req, res) => {
    try {
        const movie = await Movie.find({
            title: {
                $regex: req.params.name
            }
        })
        if (movie.length==0) {
            res.status(404).json({message: 'Movie not found'});
        }
        res.json(movie);
    }
    catch(err) {
        res.status(500).json({message: 'Server error ', err});
    }
}
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// Add movie
exports.addMovie = async (req, res) => {
    const session = await mongoose.startSession(); // Start a session for transactions
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }

        // Verify token and extract admin ID
        const decrypted = jwt.verify(token, process.env.JWT_SECRET);
        const adminID = decrypted.id;

        const { title, posterUrl, trailerUrl, language, cast, description, genre, releaseDate, duration, rating } = req.body;

        // Validate required fields
        if (!title || title.trim() === "" || !posterUrl || posterUrl.trim() === "" || !language || language.trim() === "") {
            return res.status(422).json({ message: "All required fields must be provided" });
        }

        const newMovie = new Movie({
            title,
            posterUrl,
            trailerUrl,
            language,
            cast,
            description,
            genre,
            releaseDate: new Date(releaseDate),
            duration,
            rating,
            admin: adminID
        });

        // Start a MongoDB session and create a transaction
        session.startTransaction();

        const admin = await Admin.findById(adminID).session(session);
        if (!admin) throw new Error("Admin not found");

        // Save movie and link it to the admin
        await newMovie.save({ session });
        admin.movies.push(newMovie._id);
        await admin.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        res.send(newMovie);
    } catch (err) {
        await session.abortTransaction();  // Abort if there's any error
        res.status(500).json({ message: err.message });
    } finally {
        session.endSession(); // End the session once
    }
}

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.send(movies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Search movie
exports.searchMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({messaeg: "Movie not found"});
        res.send({movie});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update movie
exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) res.status(404).json("Movie not found");

        Object.assign(movie, req.body)
        await movie.save();
        res.send("Updated " + movie.title)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete movie
exports.deleteMovie = async (req, res) => {
    const session = await mongoose.startSession(); // start a session for a transaction
    try {
        session.startTransaction();

        const deleteMovie = await Movie.findById(req.params.id).populate("admin").session(session);
        if (!deleteMovie) {
            await session.abortTransaction();
            return res.status(404).json("Movie not found");
        }

        // Remove movie ID from Admin's movie array
        if (deleteMovie.admin) {
            await deleteMovie.admin.movies.pull(deleteMovie._id);
            await deleteMovie.admin.save({ session });
        }

        // Commit the transaction after all successful operations
        await session.commitTransaction();
        res.send(`${deleteMovie.title}: deleted`);
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json(err.message);
    } finally {
        session.endSession(); // End the session
    }
}
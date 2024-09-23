const Theater = require('../models/Theater')


// add theater
exports.addTheater = async (req, res) => {
    const newTheater = new Theater(req.body)

    try {
        await newTheater.save();
        res.send(newTheater);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Get all theater
exports.getTheater = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.send(theaters)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Search theater
exports.searchTheater = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id)
        if (!theater) res.status(404).send("Theater not found");
        res.send(theater)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Update theater
exports.updateTheater = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id);
        if (!theater) res.status(404).send("Theater not found");

        Object.assign(theater, req.body)
        await theater.save();
        res.send(theater)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Delete theater
exports.deleteTheater = async (req, res) => {
    try {
        const deletedTheater = await Theater.findByIdAndDelete(req.params.id)
        if (!deletedTheater) res.status(404).send("Theater not found");
        res.send(`${deletedTheater.name}: deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
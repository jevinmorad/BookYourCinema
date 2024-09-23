const Showtime = require('../models/Showtime')

// Add Showtime
exports.addShowtime = async (req, res) => {
    const showTime = new Showtime(req.body);
    try {
        await showTime.save();
        res.send(showTime);
    } catch (err) {
        res.status(500).send(err.message);   
    }
}

// Get shows
exports.getShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.find();
        res.send(showtime);
    } catch (err) {
        res.status(500).send(err.message);       
    }
}

// Search show
exports.searchShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id);
        if(!showtime) res.status(404).send("Showtime not found");
        res.send(showtime)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Update show
exports.updateShowtime = async (req, res) => {
    try {
        let showtime = await Showtime.findById(req.params.id);
        if(!showtime) res.status(404).send("Showtime not found");

        Object.assign(showtime, req.body)
        await showtime.save();
        res.send(showtime);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Delete showtime
exports.deleteShowtime = async (req, res) => {
    try {
        let showtime = await Showtime.findByIdAndDelete(req.params.id)
        if(!showtime) res.status(404).send("Showtime not found");
        
        res.send(`${showtime.showTime} deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
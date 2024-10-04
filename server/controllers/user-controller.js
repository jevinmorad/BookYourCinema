const User = require('../models/User');
const bcrypt = require('bcrypt');

// Sign up
exports.signup = async (req, res) => {
    let { username, email, password, phone } = req.body;

    if (!username || username.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "" || !phone) {
        return res.status(422).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exist" });
    }

    let user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, phone });
        await user.save();

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Unexpected error occurred" });
    }
}

// Login
exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Incorrect password" });
        }

        res.json({ message: "Logged in successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all users
exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Search user
exports.searchUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        Object.assign(user, req.body);

        // Check if password is modified before hashing
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.save();
        res.json({ message: `${user.username} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.json({ message: `${user.username} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
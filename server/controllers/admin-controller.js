const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Sign up
exports.signup = async (req, res) => {
    let { adminName, email, password, phone } = req.body;

    if (!adminName || adminName.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "" || !phone) {
        return res.status(422).json({ message: "All fields are required." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exist" });
    }

    let admin;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new Admin({ adminName, email, password: hashedPassword, phone });
        await admin.save();

        return res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Unexpected error occurred" });
    }
}

// Sign in
exports.signIn = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        
        if (!admin) {
            res.status(404).json({ message: "admin not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.json({ message: "Logged in successfully", token, id:admin._id});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all admin
exports.getAll = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Search admin
exports.searchAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update admin
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
        }

        Object.assign(admin, req.body);

        // Check if password is modified before hashing
        if (req.body.password) {
            admin.password = await bcrypt.hash(req.body.password, 10);
        }

        await admin.save();
        res.json({ message: `${admin.email} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            res.status(404).json({ message: "admin not found" });
        }
        res.json({ message: `${admin.email} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
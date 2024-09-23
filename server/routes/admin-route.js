const express = require("express");
const { signup, login, getAll, updateAdmin, deleteAdmin } = require("../controllers/admin-controller");
const route = express.Router();

// Sign up
route.post('/signup', signup);

// Log in
route.post('/login', login);

// Get all admin
route.get('/', getAll);

// Update admin
route.patch('/:id', updateAdmin);

// Delete admin
route.delete('/:id', deleteAdmin);

module.exports = route;
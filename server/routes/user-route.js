const express = require('express');
const { signup, login, getAll, searchUser, updateUser, deleteUser } = require('../controllers/user-controller')
const route = express.Router();

// Sign in
route.post('/signup', signup);

// Login
route.post('/login', login);

// Get all user
route.get('/', getAll);

// Search user
route.get('/:id', searchUser);

// Update user
route.patch("/:id", updateUser);

// Delete user
route.delete('/:id', deleteUser);

module.exports = route
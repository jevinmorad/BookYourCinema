const express = require('express');
const { signup, signIn, getAll, searchUser, updateUser, deleteUser } = require('../controllers/user-controller')
const route = express.Router();

// Sign up
route.post('/signup', signup);

// Sign in
route.post('/signin', signIn);

// Get all user
route.get('/', getAll);

// Search user
route.get('/:id', searchUser);

// Update user
route.patch("/:id", updateUser);

// Delete user
route.delete('/:id', deleteUser);

module.exports = route
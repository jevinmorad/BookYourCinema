const express = require("express");
const { signup, signIn, getAll, updateAdmin, deleteAdmin } = require("../controllers/admin-controller");
const route = express.Router();

// Sign up
route.post('/signup', signup);

// Sign in
route.post('/signin', signIn);

// Get all admin
route.get('/', getAll);

// Update admin
route.patch('/:id', updateAdmin);

// Delete admin
route.delete('/:id', deleteAdmin);

module.exports = route;
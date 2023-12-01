// usersRoutes.js

const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

// Route to get all users
router.get('/', userController.getUsers);

// Route to create a new user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to get a user by a specific key-value pair
router.get('/:key/:value', userController.getUserByKeyValue);

// Route for user login
router.post('/login', userController.login);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete all users
router.delete('/', userController.deleteAllUsers);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;

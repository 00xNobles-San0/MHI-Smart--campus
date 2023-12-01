// reservationsRoutes.js

const express = require('express');
const reservationsController = require('../controllers/reservationsController');
const router = express.Router();

// Route to get all reservations
router.get('/', reservationsController.getReservations);

// Route to create a new reservation
router.post('/', reservationsController.createReservation);

// Route to get a reservation by ID
router.get('/:id', reservationsController.getReservationById);

// Route to update a reservation by ID
router.put('/:id', reservationsController.updateReservation);

// Route to delete a reservation by ID
router.delete('/:id', reservationsController.deleteReservation);

// Route to get a reservation by a specific key-value pair
router.get('/:key/:value', reservationsController.getReservationByKeyValue);

module.exports = router;

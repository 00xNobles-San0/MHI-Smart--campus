// parkingSpacesRoutes.js

const express = require('express');
const parkingSpacesController = require('../controllers/parkingSpacesController');
const router = express.Router();

// Route to create a parking space
router.post('/', parkingSpacesController.createParkingSpace);

// Route to get a parking space by a specific key-value pair
router.get('/:key/:value', parkingSpacesController.getParkingSpaceByKeyValue);

// Route to get all parking spaces
router.get('/', parkingSpacesController.getParkingSpaces);

// Route to get a parking space by ID
router.get('/:id', parkingSpacesController.getParkingSpaceById);

// Route to update a parking space by ID
router.put('/:id', parkingSpacesController.updateParkingSpace);

// Route to delete a parking space by ID
router.delete('/:id', parkingSpacesController.deleteParkingSpace);

module.exports = router;

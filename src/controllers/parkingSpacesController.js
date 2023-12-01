const ParkingSpaces = require('../models/spaceModel');

// Function to create a parking space
const createParkingSpace = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const newParkingSpace = new ParkingSpaces(req.body);
    const savedParkingSpace = await newParkingSpace.save();
    await con.disconnect()
    res.json(savedParkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a parking space by a specific key-value pair
const getParkingSpaceByKeyValue = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const { key, value } = req.params;
    const parkingSpace = await ParkingSpaces.findOne({ [key]: value });
    if (!parkingSpace) {
      res.status(404).send('Parking space not found');
      return;
    }
    await con.disconnect()
    res.json(parkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get all parking spaces
const getParkingSpaces = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const parkingSpaces = await ParkingSpaces.find();
    await con.disconnect()
    res.json(parkingSpaces);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a parking space by ID
const getParkingSpaceById = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const parkingSpace = await ParkingSpaces.findById(req.params.id);
    if (!parkingSpace) {
      res.status(404).send('Parking space not found');
      return;
    }
    await con.disconnect()
    res.json(parkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update a parking space by ID
const updateParkingSpace = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const updatedParkingSpace = await ParkingSpaces.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
    if (!updatedParkingSpace) {
      res.status(404).send('Parking space not found');
    return;
    }
    await con.disconnect()
    res.json(updatedParkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to delete a parking space by ID
const deleteParkingSpace = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const deletedParkingSpace = await ParkingSpaces.findByIdAndDelete(
      req.params.id
      );
      if (!deletedParkingSpace) {
        res.status(404).send('Parking space not found');
      return;
    }
    await con.disconnect()
    res.send('Parking space deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createParkingSpace,
  getParkingSpaceByKeyValue,
  getParkingSpaces,
  getParkingSpaceById,
  updateParkingSpace,
  deleteParkingSpace,
};

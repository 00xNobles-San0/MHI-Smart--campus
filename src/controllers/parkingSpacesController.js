const spaceModel = require('../models/spaceModel');
const {connectToDatabase,disconnectFromDatabase} = require('../connectToDatabase');

// Function to create a parking space
const createParkingSpace = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)
    const newParkingSpace = new ParkingSpaces(req.body);
    const savedParkingSpace = await newParkingSpace.save();
    res.json(savedParkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get a parking space by a specific key-value pair
const getParkingSpaceByKeyValue = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const { key, value } = req.params;
    const ParkingSpaces = await spaceModel(con)
    const parkingSpace = await ParkingSpaces.findOne({ [key]: value });
    if (!parkingSpace) {
      res.status(404).send('Parking space not found');
      return;
    }
    res.json(parkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get all parking spaces
const getParkingSpaces = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)

    const parkingSpaces = await ParkingSpaces.find();
    res.json(parkingSpaces);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get a parking space by ID
const getParkingSpaceById = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)

    const parkingSpace = await ParkingSpaces.findById(req.params.id);
    if (!parkingSpace) {
      res.status(404).send('Parking space not found');
      return;
    }
    res.json(parkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to update a parking space by ID
const updateParkingSpace = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)

    const updatedParkingSpace = await ParkingSpaces.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
    if (!updatedParkingSpace) {
      res.status(404).send('Parking space not found');
    return;
    }
    res.json(updatedParkingSpace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to delete a parking space by ID
const deleteParkingSpace = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)

    const deletedParkingSpace = await ParkingSpaces.findByIdAndDelete(
      req.params.id
      );
      if (!deletedParkingSpace) {
        res.status(404).send('Parking space not found');
      return;
    }
    res.send('Parking space deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
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

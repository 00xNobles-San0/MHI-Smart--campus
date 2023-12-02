const reservationsModel = require('../models/reservationsModel');
const {connectToDatabase,disconnectFromDatabase} = require('../connectToDatabase');
const spaceModel = require('../models/spaceModel');
const usersModel = require('../models/usersModel');

// Function to get all reservations
const getReservations = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Reservations = await reservationsModel(con)
    const reservations = await Reservations.find();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

const createReservation = async (req, res) => {
  let con;
  try {
    const { userId, location } = req.body;
    con = await connectToDatabase();
    const Reservations = await reservationsModel(con);
    const ParkingSpaces = await spaceModel(con);
    const Users = await usersModel(con);

    const space = await ParkingSpaces.findOne({ location });

    if (space.isOccupied) {
      res.json({ message: "The space is occupied" });
      return;
    }

    const newReservation = new Reservations(req.body);
    const savedReservation = await newReservation.save();

    // Update the user document with the new reservation ID
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $push: { reservations: savedReservation._id } },
      { new: true }
    );

    res.json(savedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con);
  }
};


// Function to get a reservation by ID
const getReservationById = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Reservations = await reservationsModel(con)

    const reservation = await Reservations.findById(req.params.id);
    if (!reservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to update a reservation by ID
const updateReservation = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Reservations = await reservationsModel(con)

    const updatedReservation = await Reservations.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
    if (!updatedReservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    res.json(updatedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to delete a reservation by ID
const deleteReservation = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Reservations = await reservationsModel(con)

    const deletedReservation = await Reservations.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    res.send('Reservation deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get a reservation by a specific key-value pair
const getReservationByKeyValue = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const { key, value } = req.params;
    const Reservations = await reservationsModel(con)

    const reservation = await Reservations.findOne({ [key]: value });
    if (!reservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

module.exports = {
  getReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationByKeyValue,
};

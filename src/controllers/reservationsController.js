const Reservations = require('../models/reservationsModel');

// Function to get all reservations
const getReservations = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const reservations = await Reservations.find();
    await con.disconnect()
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to create a new reservation
const createReservation = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const newReservation = new Reservations(req.body);
    const savedReservation = await newReservation.save();
    await con.disconnect()
    res.json(savedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a reservation by ID
const getReservationById = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const reservation = await Reservations.findById(req.params.id);
    if (!reservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    await con.disconnect()
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update a reservation by ID
const updateReservation = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const updatedReservation = await Reservations.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
    if (!updatedReservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    await con.disconnect()
    res.json(updatedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to delete a reservation by ID
const deleteReservation = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const deletedReservation = await Reservations.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    await con.disconnect()
    res.send('Reservation deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a reservation by a specific key-value pair
const getReservationByKeyValue = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const { key, value } = req.params;
    const reservation = await Reservations.findOne({ [key]: value });
    if (!reservation) {
      res.status(404).send('Reservation not found');
      return;
    }
    await con.disconnect()
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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

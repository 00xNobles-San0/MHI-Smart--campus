const connectToDatabase = require('../connectToDatabase');
const Users = require('../models/usersModel');

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const users = await Users.find();
    await con.disconnect()
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    await con.disconnect()
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    await con.disconnect()
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get a user by a specific key-value pair
const getUserByKeyValue = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const { key, value } = req.params;
    const user = await Users.findOne({ [key]: value });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    await con.disconnect()
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function for user login (assuming username and password)
const login = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password });
    if (!user) {
      res.status(401).send('Invalid username or password');
      return;
    }
    await con.disconnect()
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update a user by ID
const updateUser = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).send('User not found');
      return;
    }
    await con.disconnect()
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const con = await connectToDatabase()
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send('User not found');
      return;
    }
    await con.disconnect()
    res.send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to delete all users
const deleteAllUsers = async (req, res) => {
  try {
    const con = await connectToDatabase()
    await Users.deleteMany({});
    await con.disconnect()
    res.send('All users deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByKeyValue,
  login,
  updateUser,
  deleteAllUsers,
  deleteUserById
};

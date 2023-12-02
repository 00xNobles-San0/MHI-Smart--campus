const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const env = require('../env');
const {connectToDatabase,disconnectFromDatabase} = require('../connectToDatabase');

// Function to get all users
const getUsers = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.json(await savedUser.generateToken());
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)

    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to get a user by a specific key-value pair
const getUserByKeyValue = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const { key, value } = req.params;
    const Users = await usersModel(con)

    const user = await Users.findOne({ [key]: value });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function for user login (username and password)
const login = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const { username, password } = req.body;
    const Users = await usersModel(con)
    const user = await Users.findOne({ username });
    if (!user) {
      res.status(401).send('Invalid username or password');
      return;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).send('Invalid username or password');
      return;
    }
    res.json(await user.generateToken());
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};


// Function to update a user by ID
const updateUser = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).send('User not found');
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to delete a user by ID
const deleteUserById = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)

    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send('User not found');
      return;
    }
    res.send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

// Function to delete all users
const deleteAllUsers = async (req, res) => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)
    await Users.deleteMany({});
    res.send('All users deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectFromDatabase(con)
  }
};

const generateAccessToken = (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const access_token = jwt.sign({ userId: decoded.userId }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid Refresh Token');
  }
};

// Function to verify the validity of a token
const verifyTokenAccessToken = (req, res) => {
  try {
    const {access_token,userId} = req.body;

    const decodedAccessToken = jwt.verify(access_token, env.JWT_ACCESS_SECRET);

    const userIdFromToken = decodedAccessToken.userId;

    if (userIdFromToken === userId) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ valid: false });
  }
};

const verifyTokenRefreshToken = (req, res) => {
  try {
    const {refresh_token,userId} = req.body;
    const decodedRefreshToken = jwt.verify(refresh_token, env.JWT_REFRESH_SECRET);
    const userIdFromToken = decodedRefreshToken.userId;
    if (userIdFromToken === userId) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ valid: false });
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
  deleteUserById,
  generateAccessToken,
  verifyTokenAccessToken,
  verifyTokenRefreshToken
};

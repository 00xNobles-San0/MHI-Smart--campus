const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('../env');
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'doctor', 'student']
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
  },
  reservations: {
    type: Array,
    default: [],
  },
});

// Middleware to hash the password before saving
UsersSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password+env.HASH_SECRET, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});



// Method to compare passwords during login
UsersSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword + env.HASH_SECRET, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to generate JWT token
UsersSchema.methods.generateToken = function () {
  const token = {
    access_token:jwt.sign({ userId: this._id }, env.JWT_ACCESS_SECRET, { expiresIn: '1h' }),
    refresh_token:jwt.sign({ userId: this._id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' }),
    _id:this._id 
  };
  return token;
};

const Users = (conn)=>{
  return conn.model('Users', UsersSchema)
};


module.exports = Users;
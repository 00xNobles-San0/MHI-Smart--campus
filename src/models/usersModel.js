const mongoose = require('mongoose');

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

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;



const mongoose = require('mongoose');

const ParkingSpacesSchema = new mongoose.Schema({
  isOccupied: { 
    type: Boolean,
    default: false 
  },
  location: { 
    type: String ,
    required: true
  },
  type: { 
    type: String ,
    required: true
  },
});

const parkingSpaces = (conn)=>{
  return conn.model('parkingSpaces', ParkingSpacesSchema)
};
module.exports = parkingSpaces;

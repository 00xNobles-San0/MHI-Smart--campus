
const mongoose = require('mongoose');

const ReservationsSchema = new mongoose.Schema({
  spaceId: {
    type: String , 
    required:true
  },
  userId: { 
    type: String,
    required:true
  },
  location: { 
    type: String ,
    required:true
  },
  starttime: { type: Date},
  endtime: {type: Date}
});


const reservations = (conn)=>{
  return conn.model('reservations', ReservationsSchema)
};
module.exports = reservations;

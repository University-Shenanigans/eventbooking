const mongoose = require('mongoose')
const BookingSchema = new mongoose.Schema({
  username:{type:String,required:true},
  eventName: { type: String, required: true },
  auditorium: { type: String, required: true },
  fromtime: { type: Date, required: true },
  totime: { type: Date, required: true },
  noOfAttendees: { type: Number, required: true },
  department: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true },
  firstperson: { type: String, required: true },
  faculty: { type: String, required: true },
  phone: { type: String, required: true },
  isAccepted: { type: Number, default: 0, required: true }
},{collection:'Bookings'});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.models')
const Bookings = require('./models/Bookings.models')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb+srv://charlieuser0:poNFWjjguvWnDmU5@cluster0.ilj5gvx.mongodb.net/SampleAudiBooking-Dev?retryWrites=true&w=majority')
app.use(cors())
app.use(express.json())
app.post('/api/register',async (req,res)=>{
   
   try{
    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    res.json({status:'ok'})
   }catch(err)
   {
    res.json({status:'error',error:'duplicate'})
   }
})
app.post('/api/login',async (req,res)=>{
   
   
     const user = await User.findOne({
         name:req.body.name,
         
         password:req.body.password
     })
     
   
    
     if(user)
     {   const token = jwt.sign({
        name:req.body.name
     },'secret123')
        if(req.body.name==='admin')
        {
            return res.json({status:'ok',user:token,admin:true})
        }
        else
        {
            return res.json({status:'ok',user:token,admin:false})
        }
        
     }
     else
     {
        return res.json({status:'error',user:false})
     }
    
 })
app.post('/api/Booking',async (req,res)=>{
    try{
        await Bookings.create({
            username:req.body.username,
            eventName: req.body.eventName,
            auditorium: req.body.auditorium,
            fromtime: req.body.fromtime,
            totime: req.body.totime,
            noOfAttendees: req.body.noOfAttendees,
            department: req.body.department,
            category: req.body.category,
            email: req.body.email,
            firstperson: req.body.firstperson,
            faculty: req.body.faculty,
            phone: req.body.phone,
            isAccepted:0
        })
        res.json({status:'ok'})
       }catch(err)
       {
        res.json({status:'error',error:err})
       }
})
app.post('/api/CheckTime', async (req, res) => {
  // Extract the requested time range from the request body
  const { fromtime, totime } = req.body;
  
  const ft = new Date(fromtime);
  const tt = new Date(totime);
  const utcTimestampft = ft.toISOString();
  const utcTimestamptt = tt.toISOString();
  // Convert the original date to UTC using toISOString()
  
  // Find all bookings that are accepted
  const bookings = await Bookings.find({ isAccepted: 1 });

  // Check for collisions with each booking
  const overlappingBookings = bookings.filter(booking => {
    // Convert booking time to UTC
    const bookingFromTime = new Date(booking.fromtime).toISOString();
    const bookingToTime = new Date(booking.totime).toISOString();
    
    // Check if the requested time range overlaps with the booking's time range
    const overlaps =
      (utcTimestampft < bookingToTime && utcTimestamptt > bookingFromTime) || // Requested range overlaps with existing range
      (utcTimestampft >= bookingFromTime && utcTimestamptt <= bookingToTime) || // Requested range is completely within existing range
      (utcTimestampft <= bookingFromTime && utcTimestamptt >= bookingToTime); // Existing range is completely within requested range
  
    return overlaps;
  });
  

  // If there are overlapping bookings, send a response indicating collision
  if (overlappingBookings.length > 0) {
    res.status(400).json({ collision: 1, overlappingBookings });
  } else {
    // If no collisions, send success response
    res.status(200).json({ collision: 0});
  }
});



app.get('/api/GetBookings', async (req, res) => {
    try {
        const bookings = await Bookings.find(); // Retrieve all bookings
        res.json(bookings); // Send all bookings in JSON format
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ status: 'error', message: 'Internal server error' }); // Send a more informative error response
    }
});
// PUT /api/bookings/:id to update a booking by its _id
app.put('/api/bookings/accept/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate _id format (optional, recommended)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid _id format' });
      }
  
      const updateData = {isAccepted:1}; // Update only the isAccepted field
      
      const updatedBooking = await Bookings.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Booking not found' });
      }
  
      res.json(updatedBooking); // Send the updated booking data in the response
    } catch (err) {
      console.error('Error updating booking:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
app.put('/api/bookings/reject/:id', async (req, res) => {
    try {
      const { id } = req.params;
     
      // Validate _id format (optional, recommended)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid _id format' });
      }
  
      const updateData = {isAccepted:2};
     
      const updatedBooking = await Bookings.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Booking not found' });
      }
  
      res.json(updatedBooking); // Send the updated booking data in the response
    } catch (err) {
      console.error('Error updating booking:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
app.listen(1337,()=>{
    console.log("server started");
})
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
app.get('/api/GetBookings', async (req, res) => {
    try {
        const bookings = await Bookings.find(); // Retrieve all bookings
        res.json(bookings); // Send all bookings in JSON format
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ status: 'error', message: 'Internal server error' }); // Send a more informative error response
    }
});
app.listen(1337,()=>{
    console.log("server started");
})
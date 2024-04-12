const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.models')
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

app.listen(1337,()=>{
    console.log("server started");
})
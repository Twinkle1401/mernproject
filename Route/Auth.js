const express= require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser');

require('../db/conn');
const User= require('../model/userSchema');

router.use(cookieParser());



router.post('/register', async (req, res) => {

    const {name, email, phone, work,password, cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'Please fill all fields properly.'});
    }
    
    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({message:"this email is already registered"});
        }else if(password!=cpassword){
            return res.status(422).json({message:"Password does not match with Confirm Password"});
        }else{
            const newUser = new User({name, email, phone, work, password, cpassword});
            await newUser.save();
            res.status(201).json({message: "User registered successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
})


router.post('/signin', async (req,res) => {

    try{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({err: "Invalid Credentials"});
    }
    const userExist = await User.findOne({email:email});
        if(!userExist){
            return res.status(400).json({err:"Invalid Credentials"});
        }
        else{
        //     const isMatch=await bcrypt.compare(password, userExist.password);
        //     const token= await userExist.generateAuthToken();   //adding this line will execute function to
        //     // generate token in userSchema.js

        //      // console.log("---token---",token);
        //      res.cookie("jwtoken",token,{
        //         expires: new Date(Date.now()+ 25892000000),
        //         httpOnly:true
        //     });

        //     if(!isMatch){
        //         res.status(400).json({err:" Invalid Credentials"});
        //    }else{
        //          res.json({message: "Login Successfull"});
        //     }

        const isMatch=await bcrypt.compare(password, userExist.password);

        if(!isMatch){
           return res.status(400).json({err:" Invalid Credentials"});
       }else{
        const token= await userExist.generateAuthToken();   //adding this line will execute function to
        // generate token in userSchema.js

         // console.log("---token---",token);
         res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+ 25892000000),
            httpOnly:true
        });
             res.json({message: "Login Successfull"});
        }
        }
    }catch(err){
        console.log(err);
    }
    
})

//about us page
router.get('/about',authenticate, (req, res) => {
    res.send(req.rootUser);
})

//get user data for contact and home page
router.get('/getdata', authenticate,(req,res)=>{
    res.send(req.rootUser);
})

//contact us page
router.post('/contact', authenticate,async (req, res) => {
    try{
       const {name,email,phone,message} = req.body;
       if(!name || !email || !phone || !message){
       return res.json({error:"plz fill the contact form"});
       console.log("Error in contact form");
       }

       const userContact = await User.findOne({_id:req.userID});
       
       if(userContact){
           const userMessage = await userContact.addMessage(name,email,phone,message);
           
           await userContact.save();
           res.status(201).json({message:"User sent msg successfully"});
       }

    }catch(err){
        console.log(err);
    }
})


//logout page 
router.get('/logout', (req, res) => {
    console.log("Logout Page");
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send("User Logout");
});


module.exports = router;
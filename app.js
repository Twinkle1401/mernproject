const dotenv=require("dotenv");
const mongoose=require("mongoose");
const express= require("express");
const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn');
// const User= require('./model/userSchema');

app.use(express.json());

//Heroku 2nd step
const PORT= process.env.PORT || 5000;

app.use(require('./Route/Auth'));



// app.get('/about', (req, res) => {
//     res.send("This is About page from server.");
// })
// app.get('/contact', (req, res) => {
//     // res.cookie('test',"Twinkie");
//     res.send("This is Contact page from server.");
// })
app.get('/signin', (req, res) => {
    res.send("This is Login page from server.");
})
app.get('/register', (req, res) => {
    res.send("This is Register page from server.");
})


//Heroku 3rd step
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, ()=> {
    console.log(`Server running at port no ${PORT}`);
});
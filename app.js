require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT= process.env.PORT || 2000;
const notFound = require('./middleware/notfound');
mongoose.set("strictQuery", true);

const teamRouter = require('./routes/teamRouter')


//middleware
app.use(teamRouter)
app.use(express.json());

//error route
app.use(notFound);


const start= async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen (PORT, () =>{
            console.log(`server running on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }

};

start();
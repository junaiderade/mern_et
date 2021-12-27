const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');//will help you connect to DB
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config(); //here so that we can have our environment variabls in the .env file

const app = express();//creates express server
const port = process.env.PORT || 5000; //port server will be on

app.use(cors());//cors middleware
app.use(express.json());//allow us to parse JSON because our server is going to send and receive JSON


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
    {
    //useNewUrlParser: true, //was depreciated from tutorial
    //useCreateIndex: true//was depreciated from tutorial
    }
);//used to connect to our atlas db

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB databse connection established successfully")
})

app.use('/exercises',exercisesRouter);//uses a different router based on link
app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})



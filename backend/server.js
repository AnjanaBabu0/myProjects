const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const url='mongodb://localhost/exerciseTracker'

//env variable
require('dotenv').config();

const app = express();
const port= process.env.PORT || 5000;


//middleware
app.use(cors())
app.use(express.json())

//take uri of data base from env
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex:true})
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDb database connection established successfully")
})

// use the roure files created using require
const exercisesRouter =  require('./routes/exercises')
const usersRouter = require('./routes/users')

// when someone call /exercises, everytinh in exercise router will be loaded
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

  
//start server
app.listen(port,()=>{
    console.log(`Server is running on port:${port} `);
})

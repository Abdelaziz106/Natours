/* eslint-disable prettier/prettier */
const express = require('express');

const app = express();
const morgan = require('morgan');
const toursRoutes = require('./routes/toursRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
//using morgan middleware with dev property
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'))
}
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=>{
    console.log('Hello from the middleware')
    next();     //most important
})
//showing the request time'middleware'
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString;
    next();     //most important
})
//Crud (create, read, update, delete) in express



//creating and mounting routers
app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/tours', toursRoutes); //mounting routers


//Start Server
module.exports = app;

/* eslint-disable prettier/prettier */
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config({path: './config.env'})
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connection is Successful')
})


const port = process.env.port|| 8000;
app.listen(port,()=>{
    console.log('App is running...')
})


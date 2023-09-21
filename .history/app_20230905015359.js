require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const expressLayout = require('express-ejs-layouts')

// static files
// app.use(express.static(path.join(__dirname,
app.use(express.static('public'))

// to use req.body
app.use(express.urlencoded({ extended :true }))
app.use(express.json())

// connect to DB
const connectdb = require('./sever/config/db')
connectdb();
// Template engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


// routes
app.use('/', require('./sever/routes/main.route'))

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`) 
}
    
)
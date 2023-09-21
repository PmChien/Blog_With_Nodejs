require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const expressLayout = require('express-ejs-layouts')

// static files
// app.use(express.static(path.join(__dirname,
app.use(express.static('public'))

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
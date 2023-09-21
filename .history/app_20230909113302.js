require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const mongooseStore = require('connect-mongo')
const session = require('express-session');
const methodOverride = require('method-override')
// static files
// app.use(express.static(path.join(__dirname,
app.use(express.static('public'))

// to use req.body
app.use(express.urlencoded({ extended :true }))
app.use(express.json())

//use cookie for midleware
app.use(cookieParser())
app.use(session({
    secret :'chien secret',
    resave : false,
    saveUninitialized : true,
    store : mongooseStore.create({
        mongoUrl : process.env.MONGODB_URI
    }),
    cookie : {maxAge : 3600000}
}))
// connect to DB
const connectdb = require('./sever/config/db')
connectdb();
// Template engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


// routes
app.use('/', require('./sever/routes/main.route'))
app.use('/', require('./sever/routes/admin.route'))

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`) 
}
    
)
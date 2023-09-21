require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const expressLayout = require('express-ejs-layouts')


// Template engine
app.use(expressLayout);
app.set('layout', expressLayout)

app.get('/',(req,res)=>{res.send('hi')})

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`) 
}
    
)
const express = require('express');
const route = express.Router();


route.get('/',(req,res)=>{
    const local = {
        title : 'Nodejs Blog',
        description : 'NodeJS blog, MongoDB'
    }
    res.render('index', {local})
})

route.get('/about',(req,res)=>
    {res.render('about',{local})
})

module.exports = route;     
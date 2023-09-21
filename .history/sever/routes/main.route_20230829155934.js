const express = require('express');
const route = express.Router();

const post = require('../models/Post')

route.get('/',(req,res)=>{
    const local = {
        title : 'Nodejs Blog',
        description : 'NodeJS blog, MongoDB'
    }
    res.render('index', {local})
})

route.get('/about',(req,res)=>
    {res.render('about')
})

module.exports = route;     


function insertdatatoDB (){
    post.insertMany(
    [
        {
            title: 'first page',
            body:'let do that'
        }
    ],
    [
        {
            title: 'second page',
            body:'let do that second'
        }
    ],
    )
}
insertdatatoDB()
const express = require('express');
const route = express.Router();

const post = require('../models/Post')

route.get('/',(req,res,next)=>{
    const local = {
        title : 'Nodejs Blog',
        description : 'NodeJS blog, MongoDB'
    }
    post.find({})
        .then(blog => res.render('index',{ blog, local}))
        .catch(next) 
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
        },
        {
            title: 'second page',
            body:'let do that second'
        }
    ]
    )
}
// insertdatatoDB()
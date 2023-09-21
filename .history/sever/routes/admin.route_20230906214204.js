const express = require('express');
const route = express.Router();
const post = require('../models/Post');
const user = require('../models/User');

const adminLayouts = '../views/layouts/admin.ejs'
// [get] /admin login page
route.get('/admin', function (req, res) {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."}
        res.render('admin/index', {locals, layout : adminLayouts})
        // res.send('hi')
    } catch (error) {
        console.log(error)
    }
})

// Post - Admin checklogin
route.post('/admin',(req,res)=>{
    try {
        const{ username, password } = req.body
        res.json(req.body)
        console.log(req.body.username)
    } catch (error) {
        console.log(error)
    }
    
    
})
module.exports = route
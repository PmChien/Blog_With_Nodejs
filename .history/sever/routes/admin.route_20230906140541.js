const express = require('express');
const route = express.Router();
const post = require('../models/Post');

// [get] /admin login page
route.get('/admin', function (req, res) {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."}
        res.send('admin page')
    } catch (error) {
        
    }
})
module.exports = route
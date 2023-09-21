const express = require('express');
const route = express.Router();
const post = require('../models/Post');

const adminLayouts = '../views/layouts/admin.ejs'
// [get] /admin login page
route.get('/admin', function (req, res) {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."}
        res.render('admin/index', {locals, layout : adminLayouts})
    } catch (error) {
        
    }
})
module.exports = route
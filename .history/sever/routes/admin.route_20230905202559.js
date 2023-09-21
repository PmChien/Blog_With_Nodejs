const express = require('express');
const route = express.Router();
const post = require('../models/Post');

// [get] /admin
route.get('/admin', function (req, res) {
    res.send('admin page')
})
module.exports = route
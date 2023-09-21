const express = require('express');
const route = express.Router();
const post = require('../models/Post');
const usertable = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keyscret = process.env.JWT_SECRET
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
route.post('/admin',async(req,res)=>{
    try {
        const{ username, password } = req.body
        const user = await User.findOne({ username: req.body.username})
        if(user){
            const isPasswordValid = bcrypt.compare(password, user.password)
            isPasswordValid 
            ? res.status(201).json({Message :"Đăng nhajap thanh cong"}) 
            : res.status(409).json({Message :"Sai mật khẩu"}) 
            const token = jwt.sign({userId : user.id},keyscret)
            res.cookie('token',token,{httpOnly: true})
            res.redirect('/dashboard')
        }
        else{
            res.status(401).json({Message: "User not found"})
        }
    } catch (error) {
        console.log(error)
    }
    
    
})
// Get - Admin dasbroad
route.get('/dashboard',async(req,res)=>{
    res.render('admin/dashboard.ejs')
})
// Post - Admin register
route.post('/register',async(req,res)=>{
    try {
        const{ username, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        try {
            const user = await usertable.create({username, password :hashedPassword})
            res.status(201).json({Message:'User created',user})
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({Message: 'User have been registered'},user)
            }
            res.status(500).json({Message: 'Error creating user'})
            console.log(error)
        }
        
    } catch (error) {
        console.log(error)
    }
    
    
})
module.exports = route
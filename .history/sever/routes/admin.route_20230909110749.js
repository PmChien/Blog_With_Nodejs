const express = require('express');
const route = express.Router();
const post = require('../models/Post');
const User = require('../models/User');
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
// middleware check session
const authMiddleware = (req, res,next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message:'Unauthorized'})
    }
    try {
        const decoded = jwt.verify(token,keyscret)
        req.userId = decoded.userId
        next();
    } catch (error) {
        res.status(401).json({message:'Unauthorized'})
    }
}

// Post - Admin checklogin
route.post('/admin',async(req,res)=>{
    try {
        const{ username, password } = req.body
        const user = await User.findOne({ username: req.body.username})
        if(!user){
            return res.status(401).json({Message: "User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid)
        {
            return res.status(409).json({Message :"Wrong password"}) 
        }
        const token = jwt.sign({userId : user.id},keyscret)
        res.cookie('token',token,{httpOnly: true})
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})



// Get - Admin dasbroad
route.get('/dashboard',authMiddleware,async(req,res)=>{
    try {
        const data = await post.find({})
        res.render('admin/dashboard',{data, layout : adminLayouts})
        
    } catch (error) {
        console.log(error)
    }
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

// [get] /add-post
route.get('/add-post',authMiddleware, async (req, res) => {
    try {
        res.render('admin/add_post',{layout : adminLayouts})
        
    } catch (error) {
        console.log(error)
    }
})


// Post - Admin dasboard
route.post('/add-post',authMiddleware,async(req, res) => {
    try {
        // const {title ,body} = req.body
        await post.create({
            title: req.body.title,
            body: req.body.body,
            
        })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})
// edit Post - Admin dasboard
route.get('/edit-post',async(req,res)=>{
    const data = await post.findOne({_id : req.params.id})
    res.render('admin/edit_post',{data})
})
module.exports = route
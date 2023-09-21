const express = require('express');
const route = express.Router();

const post = require('../models/Post')


// route.get('/',async(req,res,next)=>{
//   try {
//       const local = {
//           title : 'Nodejs Blog',
//           description : 'NodeJS blog, MongoDB'
//       }
//       let limit = 2
//       let page = req.query.page || 1
//       const blog = await post.aggregate([ { $sort: { createdAt: -1 } } ])   
//       .skip((page-1)*limit)
//       .limit(limit*1) 
//       .exec()
//       const count = await post.count()
//       const nextPage = parseInt(page) +1
//       const hasNextPage = nextPage <= Math.ceil(count/page)
//       res.render('index',{ 
//             local,
//             blog,
//             current : page,
//             nextPage : hasNextPage ? nextPage : null,
//           })
//       console.log(hasNextpage,count,Math.ceil(count/page),nextPage)
//   } 
//   catch (error) {
//     console.log(error)
//   }
         
// })

// [get] / Home page
route.get('/',async(req,res,next)=>{
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    
    const {page =1,limit =4} = req.query
    const count = await post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <=  Math.ceil(count / limit);
    post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip((page-1)*limit)
    .limit(limit*1)
    .exec()
    .then (blog =>
      res.render('index', { 
            locals,
            blog,
            current: page,
            nextPage: hasNextPage ? nextPage : null,}
            // currentRoute: '/'
    )
    )
    .catch(next)
  });

// [get] / about page
route.get('/about',(req,res)=>
    {res.render('about')
})

// [get] / post detail page
route.get('/post/:id',async(req,res,next)=>{
      try {
        let slug = req.params.id
        const post1 = await post.findById({_id : slug})
        // post.findById({id:slug})
        //  .then (blog => res.)
        res.json(post1)  
      } catch (next) {
        
      }
})






module.exports = route;     


function insertdatatoDB (){
    post.insertMany(
    [
    {
      title: "Building APIs with Node.js",
      body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
    },
    {
      title: "Deployment of Node.js applications",
      body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
    },
    {
      title: "Authentication and Authorization in Node.js",
      body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
    },
    {
      title: "Understand how to work with MongoDB and Mongoose",
      body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
    },
    {
      title: "build real-time, event-driven applications in Node.js",
      body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
    },
    {
      title: "Discover how to use Express.js",
      body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
    },
    {
      title: "Asynchronous Programming with Node.js",
      body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
    },
    {
      title: "Learn the basics of Node.js and its architecture",
      body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
    },
    {
      title: "NodeJs Limiting Network Traffic",
      body: "Learn how to limit netowrk traffic."
    },
    {
      title: "Learn Morgan - HTTP Request logger for NodeJs",
      body: "Learn Morgan."
    },
    ]
)
}
// insertdatatoDB()
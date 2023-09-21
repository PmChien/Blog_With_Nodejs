const mongoose = require('mongoose');
const connectdb  = async () =>{
    try {
        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log(error)
    }
}
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // sparse:true
        // require: true,
    },
    //try
    password:String,
    email: 
         String,
        // default: "example@.com",
        // require:true,
    
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phone:String,
    status:String
})
module.exports = mongoose.model('User', UserSchema)
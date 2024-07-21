const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
   id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: "example@.com",
        require:true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phone:String,
})
module.exports = mongoose.model('User', UserSchema)
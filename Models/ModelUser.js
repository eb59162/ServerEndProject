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
    phone:String,
})
module.exports = mongoose.model('User', UserSchema)
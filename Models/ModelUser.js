const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        require: true,
        default: "name",
    },
    email: {
        type: String,
        default: "example@.com",
        require:true,
    }
})
module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose')
const  Categories ={
    PARTY:"from party",
    AREA:"from the worst area"
    }
const StorySchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    Name: {
        type: String,
        require: true,
    },
    Clock: {},
    Author: String,
    nav: String,
    Category:{type:String, enum:[ "from party",
        "from the worst area"],
        default:"from party"},
    Like:Boolean
})
module.exports = mongoose.model('Story', StorySchema)
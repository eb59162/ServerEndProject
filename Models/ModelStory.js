const mongoose = require('mongoose')
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
    Category: {type: String,
        require: true,},
    Like:Boolean
})
module.exports = mongoose.model('Story', StorySchema)
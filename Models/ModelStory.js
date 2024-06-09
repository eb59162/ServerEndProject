const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        require: true,
        default: name
    },
    date: {},
    author: String,
    nav: String,
    category: String,
})
module.exports = mongoose.model('Story', StorySchema)
const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    name: {
        type: String,
        // require: true,
    },
    clock: {},
    author: String,
    //בשביל מחיקה ועדכון הסיפור
    email:String,
    nav: String,
    category: {
        type: String,
        enum: ['From the party', 'family'],
    },
    status:String,
    like: Boolean
})
module.exports = mongoose.model('Story', StorySchema)
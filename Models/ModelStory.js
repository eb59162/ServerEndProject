const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: [true, 'זהו שדה חובה'],
        minLength: [2, 'שם חייב להכיל לפחות 2 תווים'],
        maxLength: [20, 'שם לא יכול להכיל יותר מ 20 תווים']
    },
    date: {type:{}},
    author: {type: String,
        required: [true, 'זהו שדה חובה'],
        minLength: [2, 'שם זה  חייב להכיל לפחות 2 תווים'],
        maxLength: [20, 'שם זה לא יכול להכיל יותר מ 20 תווים']
    },
    nav: String,
    category: String,
})
module.exports = mongoose.model('Story', StorySchema)
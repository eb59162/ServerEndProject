const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    From: Boolean,
    family:Boolean
})
module.exports = mongoose.model('Category', CategorySchema)
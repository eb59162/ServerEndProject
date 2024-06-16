const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: [true, 'זהו שדה חובה'],
        minLength: [2, 'שם חייב להכיל לפחות 2 תווים'],
        maxLength: [20, 'שם לא יכול להכיל יותר מ 20 תווים']
    },
    email:{type:String,
        required: [true, 'זהו שדה חובה'],
unique:true,
default:"example@gmail.com",
match:[/^[a-zA-Z0-9.@_%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'מייל זה חוקי']
    },
    phone:{type:String,
        match:[/^[0-9-]{2-11}$/,'פלאפון זה הינו חוקי']
    },
})
module.exports = mongoose.model('User', UserSchema)
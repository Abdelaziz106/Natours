const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A user must have a name'],
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'A use must have an email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo:{
        data: Buffer,
        type: String
    },
    password:{
        type:String,
        required: [true, 'A user must have a password'],
        minlength: 8
    },
    passwordConfirmation:{
        type:String,
        required: [true, 'Please re-enter your password'],
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:'The password is not the same'

        }
    }
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirmation = undefined
next()
})
const User = mongoose.model('User', userSchema)
module.exports =  User;
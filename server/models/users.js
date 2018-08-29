const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6,
        // match: new RegExp('^[a-zA-Z0-9]+$')
    },
    role: { 
        type: String,
        default: 'user' 
    }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})


var User = mongoose.model('User', userSchema)

module.exports = User
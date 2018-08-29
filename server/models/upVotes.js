const mongoose = require('mongoose')
const Schema = mongoose.Schema

const upVoteSchema = new Schema({
    count:Number,
    userId:{
        ref:'User',
        type:Schema.Types.ObjectId
    }
})

var upVote = mongoose.model('UpVote',upVoteSchema)

module.exports = upVote


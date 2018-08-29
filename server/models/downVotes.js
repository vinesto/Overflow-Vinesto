const mongoose = require('mongoose')
const Schema = mongoose.Schema

const downVoteSchema = new Schema({
    count:Number,
    userId:{
        ref:'User',
        type:Schema.Types.ObjectId
    }
})

var downVote = mongoose.model('DownVote',downVoteSchema)

module.exports = downVote


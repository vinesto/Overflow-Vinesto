const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    upCount:0,
    downCount:0,
    threadId:{
        ref:'Thread',
        type:Schema.Types.ObjectId
    },
    postId:{
        ref:'Post',
        type:Schema.Types.ObjectId
    }
})

var Vote = mongoose.model('Vote',voteSchema)

module.exports = Vote
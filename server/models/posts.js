const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        subject: String,
        content: String,
        name: String,
        userId: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        threadId: {
            ref: 'Thread',
            type: Schema.Types.ObjectId
        },
        upVotes: [],
        downVotes:[]
    },
    { timestamps: true }
)

var Post = mongoose.model('Post', postSchema)

module.exports = Post
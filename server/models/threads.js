const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema(
    {
        subject: String,
        content: String,
        name: String,
        userId: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        posts: [],
        upVotes: [],
        downVotes:[]
    },
    { timestamps: true }
)

var Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
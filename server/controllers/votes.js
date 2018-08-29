const UpVote = require('../models/upVotes')
const DownVote = require('../models/downVotes')
const Thread = require('../models/threads')
const Post = require('../models/posts')

const upVotesThread = function (req, res) {
    Thread.findOne({ _id: req.params.id })
        .then(function (threadUpVotes) {
            if (threadUpVotes.userId == req.user.id) {
                res.status(400).json({
                    message: "cant vote your thread "
                })
            } else {
                UpVote.create({
                    count: 1,
                    userId: req.user.id
                })
                .then(function (newUpVote) {
                    console.log('ini thread yg mau di votes', threadUpVotes);
                    console.log('ini post array nya', threadUpvotes.upVotes);
                    console.log('ini newupvote nya', newUpVote);
                    threadUpVotes.posts.push(newUpVote)
                    res.status(200).json({
                        message: "upvote success",
                        data:newUpVote
                    })
                })
                .catch(function (err) {
                    res.status(400).json({
                        message: "upvote failed"
                    })
                })
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: "error upvote",
                error: err.message
            })
        })
}

const downVotesThread = function (req, res) {
    Thread.findOne({ _id: req.params.id })
        .then(function (threadUpVotes) {
            if (threadUpVotes.userId == req.user.id) {
                res.status(400).json({
                    message: "cant vote your thread "
                })
            } else {
                DownVote.create({
                    count: 1,
                    userId: req.user.id
                })
                    .then(function (newUpVote) {
                        threadUpVotes.posts.push(newUpVote)
                        res.status(200).json({
                            message: "downvote success",
                            data:newUpVote
                        })
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "downvote failed"
                        })
                    })
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: "error downvote",
                error: err.message
            })
        })
}

const upVotesPost = function (req, res) {
    Thread.findOne({ _id: req.params.id })
    .then(function (threadUpVotes) {
        if (threadUpVotes.userId == req.user.id) {
            res.status(400).json({
                message: "cant vote your thread "
            })
        } else {
            Post.findOne({_id:req.params.postid})
            .then(function(postVotes){
                if(postVotes.userId == req.user.id){
                    res.status(400).json({
                        message: "cant vote your thread "
                    })
                } else {
                    UpVote.create({
                        count: 1,
                        userId: req.user.id
                    })
                    .then(function (newUpVote) {
                        res.status(200).json({
                            message: "upvote success"
                        })
                        threadUpVotes.posts.push(newUpVote)
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "upvote failed"
                        })
                    })
                }
            })
        }
    })
    .catch(function (err) {
        res.status(500).json({
            message: "error upvote",
            error: err.message
        })
    })
}

const downVotesPost = function (req, res) {
    Thread.findOne({ _id: req.params.id })
    .then(function (threadUpVotes) {
        if (threadUpVotes.userId == req.user.id) {
            res.status(400).json({
                message: "cant vote your thread "
            })
        } else {
            Post.findOne({_id:req.params.postid})
            .then(function(postVotes){
                if(postVotes.userId == req.user.id){
                    res.status(400).json({
                        message: "cant vote your thread "
                    })
                } else {
                    DownVote.create({
                        count: 1,
                        userId: req.user.id
                    })
                    .then(function (newUpVote) {
                        res.status(200).json({
                            message: "downvote success"
                        })
                        threadUpVotes.posts.push(newUpVote)
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "downvote failed"
                        })
                    })
                }
            })
        }
    })
    .catch(function (err) {
        res.status(500).json({
            message: "error downvote",
            error: err.message
        })
    })
}

module.exports = {upVotesThread,upVotesPost,downVotesThread,downVotesPost}
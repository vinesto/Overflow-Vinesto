const UpVote = require('../models/upVotes')
const DownVote = require('../models/downVotes')
const Thread = require('../models/threads')
const Post = require('../models/posts')

const upVotesThread = function (req, res) {
    Thread.findOne({ _id: req.params.id })
        .then(function (threadUpVotes) {
            console.log(threadUpVotes.userId === req.user.id);
            console.log(req.user.id);
            
            if (threadUpVotes.userId == req.user.id) {
                res.status(400).json({
                    message: "can't vote your thread "
                })
            } else {
                UpVote.create({
                    count: 1,
                    userId: req.user.id
                })
                .then(function (newUpVote) {
                    console.log(newUpVote);
                    Thread.updateOne({_id:req.params.id},{
                        $push:{upVotes:newUpVote}
                    })
                    .then(function(threadWithNewUpVote){
                        console.log(threadWithNewUpVote);
                        
                        res.status(200).json({
                            message: "upvote success",
                            data:threadWithNewUpVote
                        })
                    })
                    .catch(function(err){
                        console.log(err.message);
                        res.status(404).json({
                            message: "upvote failed"
                        })
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
                    .then(function (newDownVote) {
                        Thread.updateOne({_id:req.params.id},{
                            $push:{downVotes:newDownVote}
                        })
                        .then(function(threadWithNewDownVote){
                            res.status(200).json({
                                message: "Downvote success",
                                data:threadWithNewDownVote
                            })
                        })
                        .catch(function(err){
                            console.log(err.message);
                            res.status(404).json({
                                message: "Downvote failed"
                            })
                        })
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "downvote failed"
                        })
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
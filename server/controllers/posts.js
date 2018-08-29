const Post = require('../models/posts')
const Thread = require('../models/threads')

const addPost = function (req, res) {
    let { subject, content } = req.body
    Post.create({
        subject: subject,
        content: content,
        name: req.user.name,
        userId: req.user.id,
    })
    .then(function (newPost) {
        // console.log('ini new post', newPost);
        Thread.findOneAndUpdate({ _id: req.params.id }, {
            $push: { posts: newPost }
        })
        .then(function(newThreadNewPost){
            // console.log('ini thread ditambah post baru',newThreadNewPost);
            res.status(200).json({
                message:"success add new post",
                data:newThreadNewPost
            })
        })
        .catch(function(err){
            res.status(400).json({
                message:"failed add new post",
                error:err.message
            })
        })
    })
}

const deletePost = function(req,res){
    Post.findOneAndRemove({
        _id:req.params.id,
        userId:req.user.id
    },{})
    .then(function(deletedPost){
        res.status(200).json({
            message: "Delete post success",
            data:deletedPost 
        })
    })
    .catch(function(err){
        res.status(400).json({
            message:"Delete post failed",
            err:err.message
        })
    })
}

const updatePost = function(req,res){
    let {subject, content} = req.body
    Post.findOneAndUpdate({
        _id:req.params.id,
        userId:req.user.id
    },{
        subject:subject,
        content:content
    })
    .then(function(updatedPost){
        res.status(200).json({
            message: "Update post success",
            data:updatedPost 
        })
    })
    .catch(function(err){
        res.status(400).json({
            message: "Update post failed",
            error:err.message 
        })
    })
}

module.exports = { addPost, deletePost, updatePost }
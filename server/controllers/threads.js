const Thread = require('../models/threads')
require('dotenv').config()

const addThread = function (req, res) {
    let { subject, content } = req.body
    Thread.create({
        subject: subject,
        content:content,
        userId: req.user.id,
        name: req.user.name,
    })
        .then(function (newThread) {
            res.status(200).json({
                message: "New threads added",
                data: newThread
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "Add threads failed",
                err: err.message
            })
        })
}

const deleteThread = function (req, res) {
    Thread.findOneAndRemove({
        _id: req.params.id,
        userId: req.user.id
    })
        .then(function (deletedThread) {
            if (deletedThread.n === 0) {
                res.status(201).json({ message: "no thread found" })
            } else {
                res.status(200).json({ message: "Thread delete success" })
            }
        })
        .catch(function (err) {
            es.status(500).json({ message: "error delete thread", err: err.message })
        })
}

const updateThread = function (req, res) {
    let { subject, content } = req.body
    Thread.findOneAndUpdate({
        _id:req.params.id,
        userId:req.user.id
    },
    {
        subject:subject,
        content:content
    })
    .then(function(updatedThread){
        if (updatedThread.n === 0) {
            res.status(201).json({ message: "no Thread found" })
        } else {
            res.status(200).json({ message: "Thread update success", data:updatedThread })
        }
    })
    .catch(function (err) {
        res.status(500).json({ message: "error update thread", err: err.message })
    })
}

const getAllThread = function(req,res){
    Thread.find({})
    .then(function(threads){
        if (threads) {
            res.status(200).json({ message: "Threads found", data: threads })
        } else {
            res.status(404).json({ message: "Threads not found" })
        }
    })
    .catch(function(err){
        res.status(500).json({ message: "error get threads" })
    })
}

const getUserThread = function(req,res){
    Thread.find({
        userId:req.user.id
    })
    .then(function(userThread){
        if (userThread) {
            res.status(200).json({ message: "Threads found", data: userThread })
        } else {
            res.status(404).json({ message: "Threads not found" })
        }
    })
    .catch(function(err){
        res.status(500).json({ message: "error get Threads", data:err.messages })
    })
}

const getOneThread = function (req, res) {
    Thread.findOne({
        _id: req.params.id
    })
    .then(function (thread) {
        if (thread) {
            res.status(200).json({
                message: "thread found",
                data: thread
            })
        } else {
            res.status(404).json({
                message: "thread not found",
            })
        }
    })
    .catch(function (err) {
        res.status(500).json({
            message: "error while getting thread"
        })
    })
}

module.exports = { addThread, deleteThread, updateThread, getAllThread, getOneThread, getUserThread }
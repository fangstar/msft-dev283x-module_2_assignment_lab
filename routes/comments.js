var express = require('express');


module.exports = {
  getComments(req, res) {
    res.status(200).send(req.store.posts[req.params.postId].comments)
  },
  addComment(req, res) {
    let newComment = req.body

    // let id = req.params.posts[req.params.postId].comments.length
    let comments = req.store.posts[req.params.postId].comments
    let id = comments.length
    comments.push(newComment)
    // let commentId = req.params.commentId
    // req.params.posts[req.params.postId].comments.push(newComment)

    res.status(201).send({commentId: id})
  },
  updateComment(req, res) {
    let comments = req.store.posts[req.params.postId].comments

    comments[req.params.commentId] = req.body
    res.status(200).send(req.store.posts[req.params.postId].comments)

  },
  removeComment(req, res) {
    let comments = req.store.posts[req.params.postId].comments

    comments.splice(req.params.commentId,1)
    res.status(204).send()
  }
}

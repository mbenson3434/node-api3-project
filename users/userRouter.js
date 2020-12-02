const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();

router.post('/', (req, res) => {
  const postFromClient = req.body
  Users.insert(postFromClient)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      })
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Posts.getById(id)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      })
    })
});

router.get('/', validatePost, (req, res) => {
  Users.get(req.query)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "The posts information could not be retrieved."
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "The posts information could not be retrieved."
      })
    })
});

router.get('/:id/posts', validateUser, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "The posts information could not be retrieved."
      })
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
    Users.remove(id)
    .then(data => {
        if(data) {
            res.status(204).json({ message: data + " item deleted" })
        } else {
            res.status(404).json({ message: "Post does not exist with id: " + id})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post could not be removed" })
    })
});

router.put('/:id', (req, res) => {
  const changes = req.body
    const { id } = req.params
    Users.update(id, changes)
    .then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post information could not be modified." })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
    .then(data => {
      console.log(data)
      if (data) {
        req.user = data
        next()
      } else {
        res.status(404).json({ message: 'There is no user with id ' + id })
      }
    })
    .catch(error => (
      console.log(error.message)
    ))
}

function validateUser(req, res, next) {
  const { id } = req.params
  
  Users.getUserPosts(id)
  .then(data => {
    console.log(data)
    if (data.length >= 1) {
      
      next()
    } else {
      res.status(404).json({ message: 'There is no user with id ' + id })
    }
  })
  .catch(error => (
    console.log(error.message)
  ))
}

function validatePost(req, res, next) {
  Users.get(req.query)
  .then(data => {
    console.log(data)
    if (data.length >= 1) {
      req.user = data
      next()
    } else {
      res.status(404).json({ message: 'There are no posts to retrieve' })
    }
  })
  .catch(error => (
    console.log(error.message)
  ))
}

module.exports = router;

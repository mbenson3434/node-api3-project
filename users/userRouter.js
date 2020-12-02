const express = require('express');
const Users = require('./userDb.js');

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

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

const express = require('express');

const db = require('../data/db');

const router = express.Router();


// handles urls beginning with /api/hubs

// /api/hubs
router.get('/', async (req, res) => {
  try {
    const post = await db.find();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});
  
  router.get('/:id', async (req, res) => {
    try {
      const post = await db.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  router.post('/', async (req, res) => {
    const {
      title,
      contents
    } = req.body;
    if (title && contents) {
      try {
        const post = await db.insert({
          title,
          contents
        });
        res.status(201).json(post);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const post = await db.remove(req.params.id);
      if (post > 0) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res.status(404).json({ message: "post dont exist" });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const post = await db.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });

  // router.get('/:id/posts', async (req, res) => {
  //     try {
  //         const messages = await Hubs.findHubMessages(req.params.id);
          
  //         if(messages && messages.length > 0) {
  //             res.status(200).json(messages);
  //           } else {
  //               res.status(404).json({ message: 'No messages for this hub' });
  //               }
  //           } catch (error) {
  //             res
  //               .status(500)
  //               .json({ message: 'error getting the messages for this hub' })
  //           }
  // });

  module.exports = router;
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
    try {
      const posts = await Hubs.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const posts = await Posts.remove(req.params.id);
      if (posts > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const possts = await Hubs.update(req.params.id, req.body);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
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
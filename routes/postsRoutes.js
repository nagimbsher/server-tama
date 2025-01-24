const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById, deletePost } = require('../controllers/postsController');

// Get all posts
router.get('/', getPosts);

// Create a new post
router.post('/', createPost);

// Get a specific post by ID
router.get('/:id', getPostById);

// Delete a post by ID
router.delete('/:id', deletePost);

module.exports = router;

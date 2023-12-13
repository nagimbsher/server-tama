const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); 


router.get('/', async (req, res) => {
    try {
        const allPosts = await pool.query('SELECT * FROM posts');
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/', async (req, res) => {
    try {
        const { content, author_id } = req.body;
        const newPost = await pool.query('INSERT INTO posts (content, author_id) VALUES ($1, $2) RETURNING *', [content, author_id]);
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Error creating the post');
    }
});

module.exports = router;

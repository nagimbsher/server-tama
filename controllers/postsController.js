const pool = require('../config/dbConfig'); // Ensure this points to your database connection file

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'An error occurred while creating the post.' });
  }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post.' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json({ message: 'Post deleted successfully.', post: result.rows[0] });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post.' });
  }
};

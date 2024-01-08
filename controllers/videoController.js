const pool = require('../config/dbConfig');

exports.getAllVideos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getVideo = async (req, res) => {
  const videoId = req.params.id; 

  try {
    const result = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
    if (result.rows.length === 0) {
        return res.status(404).send('Video not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

<<<<<<< HEAD
exports.deleteVideo = async (req, res) => {
  const videoId = req.params.id; 

  try {
    const deleteQuery = 'DELETE FROM videos WHERE id = $1';
    const result = await pool.query(deleteQuery, [videoId]);

    if (result.rowCount === 0) {
      return res.status(404).send('Video not found');
    }

    res.status(200).send('Video deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.addVideo = async (req, res) => {
  const { title, url, description } = req.body;

  if (!title || !url || !description) {
    return res.status(400).json({ error: 'Please provide title, url, and description' });
  }

  try {
    const insertQuery = 'INSERT INTO videos (title, url, description) VALUES ($1, $2, $3)';
    await pool.query(insertQuery, [title, url, description]);
    res.status(201).send('Video added successfully');
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(409).send('A video with the same URL already exists'); 
    }
    console.error(err);
    res.status(500).send('Server error');
  }
};
=======
>>>>>>> 8da15362de3b5fefc9861ad0e5a7f814bddf5625

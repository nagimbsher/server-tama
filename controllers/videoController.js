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


const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/dbConfig'); 

//Load environment variables
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Importing Routes
const videoRoutes = require('./routes/videoRoutes'); 
const authRoutes = require('./routes/authRoutes');

// Using Routes
app.use('/api/videos', videoRoutes); 
app.use('/auth', authRoutes);

// ✅ Test route for DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Database connection failed');
  }
});

// Starting Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



// const express = require('express');
// const cors = require('cors');
// const app = express();


// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Importing Routes
// const videoRoutes = require('./routes/videoRoutes'); 
// const authRoutes = require('./routes/authRoutes');


// // Using Routes
// app.use('/api/videos', videoRoutes); 
// app.use('/auth', authRoutes);


// // Starting Server
// app.listen(process.env.PORT || 3001, () => {
//   console.log(`Server listening on ${process.env.PORT || 3001}`);
// });






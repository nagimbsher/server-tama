// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Importing Routes
const videoRoutes = require('./routes/videoRoutes'); // Adjust the path as necessary
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');

// Using Routes
app.use('/api/videos', videoRoutes); // This applies '/api/videos' prefix to all routes in videoRoutes
app.use('/auth', authRoutes);
//app.use('/api/posts', postsRoutes);

// Starting Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());

// app.use(express.json());


// const videoRoutes = require('./routes/videoRoutes');
// const authRoutes = require('./routes/authRoutes'); 
// const postsRoutes = require('./routes/postsRoutes');


// app.use('/api/videos', videoRoutes);
//  app.use('/auth', authRoutes);

//  app.use('/api/posts', postsRoutes)

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



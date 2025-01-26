const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Importing Routes
const videoRoutes = require('./routes/videoRoutes'); 
const authRoutes = require('./routes/authRoutes');


// Using Routes
app.use('/api/videos', videoRoutes); 
app.use('/auth', authRoutes);


// Starting Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







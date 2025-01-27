const express = require('express');
const cors = require('cors');
const app = express();


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
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT || 3001}`);
});






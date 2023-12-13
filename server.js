const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());


const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes'); 
const postsRoutes = require('./routes/postsRoutes');


app.use('/api/videos', videoRoutes);
 app.use('/auth', authRoutes);

 app.use('/api/posts', postsRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



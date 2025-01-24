require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,      // PostgreSQL username
  host: process.env.DB_HOST,      // Database host (e.g., Render or Neon host)
  database: process.env.DB_NAME,  // Database name
  password: process.env.DB_PASS,  // PostgreSQL password
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Allow SSL connection (required for Neon/Render)
  },
});

module.exports = pool;




// require('dotenv').config();
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT || 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// module.exports = pool;



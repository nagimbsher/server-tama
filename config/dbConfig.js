require('dotenv').config();
const { Pool } = require('pg');

// Use the connection string from the .env file
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false, // This is needed for cloud databases with SSL
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



// require('dotenv').config();

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER, 
//   host: process.env.DB_HOST, 
//   database: process.env.DB_NAME, 
//   password: process.env.DB_PASS, 
//   port: process.env.DB_PORT,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Error acquiring client', err.stack);
//   } else {
//     console.log('Connected to the database');
//     release();
//   }
// });

// module.exports = pool;







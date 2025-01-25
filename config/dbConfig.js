require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER, // 'neondb_owner'
  host: process.env.DB_HOST, // 'ep-holy-poetry-a8c3dad4-pooler.eastus2.azure.neon.tech'
  database: process.env.DB_NAME, // 'neondb'
  password: process.env.DB_PASS, // 'npg_lOLa5BrdGDc3'
  port: process.env.DB_PORT, // 5432
  ssl: { rejectUnauthorized: false }, // Required for secure connection
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to the database');
    release();
  }
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



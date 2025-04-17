
// const { Pool } = require('pg');
// require('dotenv').config();
// console.log('Connecting with:', {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// config/dbConfig.js
const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

if (process.env.DATABASE_URL) {
  // e.g. on Render or if you define DATABASE_URL locally
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction
      ? { rejectUnauthorized: false }
      : false,
  };
} else {
  // local dev using individual env vars
  poolConfig = {
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port:     process.env.DB_PORT,
    ssl:      false,
  };
}

const pool = new Pool(poolConfig);

module.exports = pool;


// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   ssl: { rejectUnauthorized: false }, // important for Supabase on Render
// });

// module.exports = pool;




// const { Pool } = require('pg');
// require('dotenv').config(); 

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   ssl: { rejectUnauthorized: false },
// });

// module.exports = pool;

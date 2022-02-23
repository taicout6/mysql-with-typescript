import dotenv from 'dotenv';

import mysql from 'mysql2';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DN_NAME,
});

export default connection;

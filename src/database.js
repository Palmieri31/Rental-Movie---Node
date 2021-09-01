const mysql = require('mysql');
const { promisify } = require('util');
const config = require('./config');

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  if (connection) {
    connection.release();
    // eslint-disable-next-line no-console
    console.log('DB is Connected');
  }
});

pool.query = promisify(pool.query);
module.exports = pool;

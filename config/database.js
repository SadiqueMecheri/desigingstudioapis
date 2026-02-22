const { createPool } = require("mysql");

const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  timezone: 'utc',
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
  });
  

module.exports = pool;
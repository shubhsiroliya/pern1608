// const { Pool } = require("pg");
// const dotenv = require("dotenv");
// dotenv.config();

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB,
// });

// module.exports = pool;

require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database = process.env.DB;
const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${database}`;
const pool = new Pool({
  connectionString,
});

module.exports = pool;

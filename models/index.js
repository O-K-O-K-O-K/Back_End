const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

exports.db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


//local db
// exports.db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     port: '3306',
//     password: 'test',
//     database: 'dogdogdog'
//   });

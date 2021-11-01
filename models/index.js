const mysql = require('mysql');

// exports.db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// exports.db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'test',
//     database: 'dogdogdog'
//   });

const db_info = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'test',
  database: 'dogdogdog'
}

module.exports = {
  init: function () {
    return  mysql.createConnection(db_info);
  },
  connect: function(conn) {
    conn.connect(function(err) {
      if(err) console.error('mysql connection error : '+err);
      else console.log('mysql is connected successfully!');
    });
  }
}
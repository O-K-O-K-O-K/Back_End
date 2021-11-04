const mysql = require('mysql');

exports.db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// exports.db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     port: '3306',
//     password: 'test',
//     database: 'dogdogdog'
//   });

//정규님거
// const db_info = {
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: '29053696',
//   database: 'dog'
// }

// 선희님, 유정
// const db_info = {
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: 'test',
//   database: 'dogdogdog'
// }

// module.exports = {
//   init: function () {
//     return  mysql.createConnection(db_info);
//   },
//   connect: function(conn) {
//     conn.connect(function(err) {
//       if(err) console.error('mysql connection error : '+err);
//       else console.log('mysql is connected successfully!');
//     });
//   }
// }

// const dbTest =async () => {
//   const connection = await db_info.getConnection(async conn => conn);
// };
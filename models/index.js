const mysql = require('mysql')
// const dotenv = require("dotenv");
// dotenv.config();

exports.db = mysql.createConnection({
<<<<<<< HEAD
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // multipleStatements: true,
})
=======
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
>>>>>>> 37868d6110b3ecf6ede9343d8d37e07e89cd023f

//local db
// exports.db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     port: '3306',
//     password: 'test',
//     database: 'dogdogdog'
//   });
<<<<<<< HEAD

// exports.db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     port: '3306',
//     password: '29053696',
//     database: 'dog'
// });

// module.exports = {
//   init: function () {
//     return  mysql.createConnection(db_info);
//   },
//   connect: function(conn) {
//     conn.connect(function(err)                      {
//       if(err) console.error('mysql connection error : '+err);
//       else console.log('mysql is connected successfully!');
//     });
//   }
// }

// const dbTest =async () => {
//   const connection = await db_info.getConnection(async conn => conn);
// };
=======
>>>>>>> 37868d6110b3ecf6ede9343d8d37e07e89cd023f

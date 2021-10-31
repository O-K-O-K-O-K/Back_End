const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  // port : 3000,
  user: 'root',
  password: 'test',
  database: 'dogdogdog',
});

connection.connect();

// connection.query('SELECT * FROM topic', function(error, results, fields){
//   if(error) {
//     console.log(error);
//   }
//   console.log(results)
// });

// connection.end();
var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "hr2022",
  password: "12345678",
});

connection.connect();

connection.query(
  "SELECT * FROM hr2022.tbl_project",
  function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
  }
);

connection.end();
export default connection;

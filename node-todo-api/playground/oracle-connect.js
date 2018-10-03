var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "devsoa",
    password      : "12345",
    connectString : "192.168.208.128/XE"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT emp_id, emp_name, emp_alias, emp_password, emp_dni, emp_email
       FROM employee
       WHERE emp_id = :id`,
      [3],  // bind value for :id
      function(err, result) {
        if (err) {
          console.error(err.message);
          connection.doRelease;
          return;
        }
        console.log(result);
        console.log(result.rows);
        connection.doRelease;
      });
  });
const mysql = require("mysql2");
const cTable = require("console.table");
const {
  viewDepartmentsSQL,
  viewRolesSQL,
  viewEmployeesSql,
} = require("./queries");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "language",
  database: "tracker_db",
});

function viewDepartments() {
  db.query(viewDepartmentsSQL, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res);
  });
}

function viewRoles() {
  db.query(viewRolesSQL, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res);
  });
}

function viewEmployees() {
  db.query(viewEmployeesSql, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res);
  });
}
// viewEmployees();
// viewRoles();
// viewDepartments();
db.end();

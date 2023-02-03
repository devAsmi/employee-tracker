const mysql = require("mysql2");
const cTable = require("console.table");

const {
  viewDepartmentsSQL,
  viewRolesSQL,
  viewEmployeesSql,
  addDepartmentSQL,
  addRoleSQL,
  addEmployeesSql,
} = require("./queries");

let db;

function createDbConnection() {
  db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "language",
    database: "tracker_db",
  });
}

// using db.promise() version
function viewDepartments() {
  return db.promise().query(viewDepartmentsSQL);
}

function viewRoles() {
  return db.promise().query(viewRolesSQL);
}

function getRoles() {
  db.query("Select role.id, role.title from role", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
}

function viewEmployees() {
  return db.promise().query(viewEmployeesSql);
}

function addDepartment(departmentName) {
  return db.promise().query(addDepartmentSQL, [departmentName]);
}

function addRole(title, salary, departmentId) {
  return db.promise().query(addRoleSQL, [title, salary, departmentId]);
}

function addEmployee(first_name, last_name, role, manager) {
  db.query(
    "SELECT role.id from role WHERE role.title = ?",
    [role],
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
      // const roleid = res[0].id;
      // db.query(addEmployeesSql, [first_name, last_name, roleid], (err, res) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log("added employee");
      //   viewEmployees();
      // });
    }
  );
}

function closeDbConnection() {
  db.end();
}

module.exports = {
  createDbConnection,
  viewDepartments,
  viewRoles,
  getRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  closeDbConnection,
};

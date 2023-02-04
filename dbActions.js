const mysql = require("mysql2");
const cTable = require("console.table");

const {
  viewDepartmentsSQL,
  viewRolesSQL,
  viewEmployeesSql,
  addDepartmentSQL,
  addRoleSQL,
  addEmployeesSql,
  simpleViewRoleSql,
  simpleViewEmloyeeSql,
  updateEmployeeRoleSql,
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
//using db.promise ()version for view roles
function viewRoles() {
  return db.promise().query(viewRolesSQL);
}
//using db.promise ()version for getroles
function getRoles() {
  db.query("Select role.id, role.title from role", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
}

//using db.promise ()version for getroles
function viewEmployees() {
  return db.promise().query(viewEmployeesSql);
}
//using db.promise ()version for addDepartment
function addDepartment(departmentName) {
  return db.promise().query(addDepartmentSQL, [departmentName]);
}
//using db.promise ()version for addrole
function addRole(title, salary, departmentId) {
  return db.promise().query(addRoleSQL, [title, salary, departmentId]);
}
//using db.promise ()version for addemployee, and checked for manager id
function addEmployee(firstName, lastName, roleId, managerId) {
  if (managerId == "") {
    managerId = null;
  }

  return db
    .promise()
    .query(addEmployeesSql, [firstName, lastName, roleId, managerId]);
}
//using db.promise ()version for updateEmployeeRole
function updateEmployeeRole(roleId, employeeId) {
  return db.promise().query(updateEmployeeRoleSql, [roleId, employeeId]);
}
//using db.promise ()version for view simple roles
function viewSimpleRoles() {
  return db.promise().query(simpleViewRoleSql);
}
//using db.promise ()version for view simple employees
function viewSimpleEmployees() {
  return db.promise().query(simpleViewEmloyeeSql);
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
  viewSimpleRoles,
  viewSimpleEmployees,
  updateEmployeeRole,
};

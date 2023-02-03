const viewDepartmentsSQL = `SELECT * FROM department`;

const addDepartmentSQL = `INSERT INTO department (name)
                          VALUES (?)`;

const viewRolesSQL = `SELECT role.id, role.title, department.name as department, role.salary 
                    FROM role JOIN department 
                    ON role.department_id = department.id`;

const addRoleSQL = `INSERT INTO role (title, salary, department_id)
                          VALUES (?,?,?)`;

const viewEmployeesSql = `SELECT e.id, e.first_name, e.last_name,
                        role.title, department.name as department, role.salary,
                        concat(e1.first_name, " ", e1.last_name) as manager
                        FROM employee e
                        LEFT JOIN employee e1
                        ON e.manager_id = e1.id
                        JOIN role
                        ON e.role_id = role.id
                        JOIN department
                        ON department.id = role.department_id
                      `;
const addEmployeesSql = `INSERT INTO employee (first_name,last_name,manager_id)
                          VALUES(?,?,?,)`;

module.exports = {
  viewDepartmentsSQL,
  viewRolesSQL,
  viewEmployeesSql,
  addDepartmentSQL,
  addRoleSQL,
  addEmployeesSql,
};

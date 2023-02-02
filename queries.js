const viewDepartmentsSQL = `SELECT * FROM department`;

const viewRolesSQL = `SELECT role.id, role.title, department.name as department, role.salary 
                    FROM role JOIN department 
                    ON role.department_id = department.id`;

const viewEmployeesSql = `SELECT e.id, e.first_name, e.last_name, concat(e1.first_name, " ", e1.last_name) as manager,
                        role.title, role.salary, 
                        department.name as department
                        FROM employee e
                        LEFT JOIN employee e1
                        ON e.manager_id = e1.id
                        JOIN role
                        ON e.role_id = role.id
                        JOIN department
                        ON department.id = role.department_id
                      `;

module.exports = { viewDepartmentsSQL, viewRolesSQL, viewEmployeesSql };

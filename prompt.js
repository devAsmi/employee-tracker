const inquirer = require("inquirer");
const {
  closeDbConnection,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  viewSimpleRoles,
  viewSimpleEmployees,
  addEmployee,
  updateEmployeeRole,
} = require("./dbActions");

const menuQuestion = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Quit",
  ],
};

const departmentQuestion = {
  type: "input",
  name: "departmentName",
  message: "What is the name of the department?",
};

const roleQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?",
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the first name of the employee?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the last name of the employee?",
  },
];

// displaying the menu for the user to perform actions
function displayMenu() {
  // based on action selected by user, calling functions for particular actions and displaying the menu again if user didn't select quit
  inquirer.prompt(menuQuestion).then(({ action }) => {
    switch (action) {
      case "View all departments":
        viewDepartments() // will return a promise that will return the result of query in db
          .then(([rows]) => {
            console.table(rows);
            displayMenu();
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "View all roles":
        viewRoles()
          .then(([rows]) => {
            console.table(rows);
            displayMenu();
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "View all employees":
        viewEmployees()
          .then(([rows]) => {
            console.table(rows);
            displayMenu();
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "Add a department":
        inquirer.prompt(departmentQuestion).then(({ departmentName }) => {
          addDepartment(departmentName)
            .then(() => {
              displayMenu();
            })
            .catch((e) => {
              console.error(e);
            });
        });
        break;
      case "Add a role":
        viewDepartments() // will return a promise that will return the result of query in db
          .then(([departments]) => {
            // creating choices for department name question, object with name and value where name will be displayer and value will be the id of department
            const departmentChoices = departments.map((dep) => {
              return {
                name: dep.name,
                value: dep.id,
              };
            });
            const q = {
              type: "list",
              name: "departmentId",
              message: "Which department does the role belong to?",
              choices: departmentChoices,
            };
            roleQuestions.push(q);
            inquirer
              .prompt(roleQuestions)
              .then(({ roleName, salary, departmentId }) => {
                addRole(roleName, salary, departmentId).then(() => {
                  displayMenu();
                });
              });
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "Add an employee":
        viewSimpleRoles()
          .then(([ans]) => {
            const roles = ans.map((role) => {
              return {
                name: role.title,
                value: role.id,
              };
            });
            viewSimpleEmployees().then(([ans]) => {
              const employees = ans.map((emp) => {
                return {
                  name: emp.full_name,
                  value: emp.id,
                };
              });
              const noneOption = {
                name: "None",
                value: "",
              };
              const roleQ = {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roles,
              };
              const managerQ = {
                type: "list",
                name: "managerId",
                message: "Who is the empoloyee's manager?",
                choices: [noneOption, ...employees],
              };
              employeeQuestions.push(roleQ, managerQ);
              inquirer
                .prompt(employeeQuestions)
                .then(({ firstName, lastName, roleId, managerId }) => {
                  addEmployee(firstName, lastName, roleId, managerId).then(
                    () => {
                      displayMenu();
                    }
                  );
                });
            });
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "Update an employee role":
        viewSimpleRoles().then(([ans]) => {
          const roles = ans.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          viewSimpleEmployees().then(([ans]) => {
            const employees = ans.map((emp) => {
              return {
                name: emp.full_name,
                value: emp.id,
              };
            });
            const employeeQ = {
              type: "list",
              name: "employeeId",
              message: "Which employee do you want to update?",
              choices: employees,
            };
            const roleQ = {
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roles,
            };
            inquirer
              .prompt([employeeQ, roleQ])
              .then(({ employeeId, roleId }) => {
                updateEmployeeRole(roleId, employeeId).then(() => {
                  displayMenu();
                });
              });
          });
        });
        break;
      case "Quit":
        closeDbConnection();
        break;
    }
  });
}

module.exports = { displayMenu };

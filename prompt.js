const inquirer = require("inquirer");
const {
  closeDbConnection,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
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
            const q = {
              type: "list",
              name: "department",
              message: "Which department does the role belong to?",
              choices: departments,
            };
            roleQuestions.push(q);
            inquirer
              .prompt(roleQuestions)
              .then(({ roleName, salary, department }) => {
                const departmentId = departments.filter(
                  (dep) => dep.name === department
                )[0].id;
                addRole(roleName, salary, departmentId)
                  .then(() => {
                    displayMenu();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case "Add an employee ":
        console.log("Add an employee");
        displayMenu();
        break;
      case "Quit":
        closeDbConnection();
        break;
    }
  });
}

module.exports = { displayMenu };

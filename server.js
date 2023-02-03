const { createDbConnection } = require("./dbActions");
const { displayMenu } = require("./prompt");

// initialize db connection
createDbConnection();

// display the application menu
displayMenu();

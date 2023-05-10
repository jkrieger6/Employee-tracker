const inquirer = require("inquirer");
const cTable = require("console.table");    
const db = require("./db/connection");

// Inquierer prompt to view all departments
function viewDepartments() {
    inquirer.prompt([
        {
            type: "list",
            name: "viewDepartments",
            message: "Select which department you would like to view.",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
            ]
        }
    ])
        .then((answer) => {
            cTable.getTable(answer);
        });
}

// Initialize app 
const init = () => {
    viewDepartments();
};
init();

module.exports = init, viewDepartments;
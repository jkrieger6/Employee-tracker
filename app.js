// MySQL2
const mysql = require("mysql2");
// dotenv
require("dotenv").config();
// Node Ctable package
require("console.table");
// Inquirer
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_tracker database.`)
);
promptUser();


function promptUser () {
 inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const { options } = answer;
      if (options === "View all departments") {
        viewDepartments();
      } else if (options === "View all roles") {
        viewRoles();
      } else if (options === "View all employees") {
        viewEmployees();
      } else if (options === "Add a department") {
        addDepartment();
      } else if (options === "Add a role") {
        addRole();
      } else if (options === "Add an employee") {
        addEmployee();
      } else if (options === "Update an employee role") {
        updateEmployeeRole();
      } else if (options === "Exit") {
        db.end();
      }
    });
};

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptUser();
  });
}

// // View all roles
function viewRoles () {
    db.query("SELECT * FROM role", function (err, results) {
        console.table(results);
        promptUser();
  });
}

// // View all employees
function viewEmployees () {
    db.query("SELECT *, role.title FROM employee JOIN role ON employee.role_id = role_id", function (err, results) {
        // console.log(results);
        console.table(results);
        promptUser();
});
}

// Add a department
function addDepartment () {
    inquirer.prompt ({
        type: "input",
        name: "department",
        message: "Please enter a name for new department"
    }) 
    .then ((answer) => {
        let sql = `INSERT INTO department (name) VALUES (?)`;
        let params = [answer.department];
      
        db.query(sql, params, (err, res) => {
          if (err) {
            console.log("Could not add department.");
          } else {
            viewDepartments();
          }
          promptUser();
        });
    });   
}

// Add a role
function addRole () {
    inquirer.prompt ([
        {
            type: "input",
            name: "title",
            message: "Please enter a title for new role"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter a salary for new role"
        },
        {
            type: "input",
            name: "department_id",
            message: "Please enter a department ID for new role"
        }
    ])
    .then ((answer) => {
        let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        let params = [answer.title, answer.salary, answer.department_id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log("Could not add role.");
            } else {
                viewRoles();
            }
            promptUser();
        });
    });
}

// // Add an employee
function addEmployee () {
    inquirer.prompt ([
        {
            type: "input",
            name: "first_name",
            message: "Please enter a first name for new employee"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter a last name for new employee"
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter a role ID for new employee"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Please enter a manager ID for new employee"
        }
    ])
    .then ((answer) => {
        let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        let params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log("Could not add employee.");
            } else {
                viewEmployees();
            }
            promptUser();
        });
    });
}

// // Update a current employee's role
function updateEmployeeRole () {
    inquirer.prompt ([
        {
            type: "input",
            name: "employee_id",
            message: "Please enter an employee ID to update"
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter a new role ID for employee"
        }
    ])
    .then ((answer) => {
        let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        let params = [answer.role_id, answer.employee_id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log("Could not update employee role.");
            } else {
                viewEmployees();
            }
            promptUser();
        });
    });
}


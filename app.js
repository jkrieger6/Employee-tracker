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
    db.query("SELECT * FROM roles", function (err, results) {
        console.table(results);
        promptUser();
        });
}
// // View all employees
function viewEmployees () {

}

// app.get("/api/employees", (req, res) => {
//   db.query("SELECT * FROM employees", (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

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
// app.post("/api/roles", ({ body }, res) => {
//   let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
//   let params = [body.title, body.salary, body.department_id];

//   db.query(sql, params, (err, res) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "Role added successfully.",
//       data: body,
//     });
//   });
// });

// // Add an employee
// app.post("/api/employees", ({ body }, res) => {
//   let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)`;
//   let params = [body.first_name, body.last_name, body.role_id, body.manager_id];

//   db.query(sql, params, (err, res) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "Employee added successfully.",
//       data: body,
//     });
//   });
// });

// // Update a current employee's role
// app.put("/api/employees/:id", (req, res) => {
//   let sql = `UPDATE employee SET role_id =? WHERE id = ?`;
//   let params = [req.body.role_id, req.params.id];

//   db.query(sql, params, (err, res) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!res.affectedRows) {
//       res.json({
//         message: "Employee not found.",
//       });
//     } else {
//       res.json({
//         message: "Success! Employee role updated.",
//         data: req.body,
//         changes: res.affectedRows,
//       });
//     }
//   });
// });

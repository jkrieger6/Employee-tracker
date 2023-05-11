const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const ctable = require('console.table');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    { 
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'employee_trackerDB'
    },
    console.log(`Connected to the employee_tracker database.`)
);
db.connect() = () => {
    promptUser()
    };

    const promptUser = () => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: [
                    "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
                ]
            }   
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
        })
    };

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });
};

// View all departments
app.get('/api/departments', (req, res) => {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all roles
app.get('/api/roles', (req, res) => {
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all employees
app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Add a department
app.post('/api/departments', ({ body }, res) => {
    let sql = `INSERT INTO departments (name) VALUES (?)`;
    let params = [body.name];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Department added successfully.',
            data: body
        });
    });
});

// Add a role
app.post('/api/roles', ({ body }, res) => {
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    let params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Role added successfully.',
            data: body
        });
    });
});

// Add an employee
app.post('/api/employees', ({ body }, res) => {
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)`;
    let params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee added successfully.',
            data: body
        });
    });
});

// Update a current employee's role
app.put('/api/employees/:id', (req, res) => {
    let sql = `UPDATE employee SET role_id =? WHERE id = ?`;
    let params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!res.affectedRows) {
            res.json({
                message: 'Employee not found.'
            });
        } else {
            res.json({
                message: 'Success! Employee role updated.',
                data: req.body,
                changes: res.affectedRows
            });
        }
    });
});

// Listner to connect to PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



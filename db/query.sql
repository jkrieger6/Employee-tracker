-- Join all tables together when view all employees is selected from the menu list --
SELECT *
FROM department, role, employee
JOIN role ON department.id = role.department_id
JOIN employee ON role.id = employee.role_id
ORDER BY employee.id;

-- Path: db/query.sql --
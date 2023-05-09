INSERT INTO department (name)
VALUES ('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead' ,100000,1),
('Salesperson',80000,1),
('Lead Engineer',150000,2),
('Software Engineer',120000,2),
('Accountant',125000,3),
('Legal Team Lead',250000,4),
('Lawyer',190000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Janette' ,'Dough',1,NULL),
('John','Smith',2,1),
('Molly','Lowe',3,NULL),
('Jake','Krieger',4,3),
('Rupert','Thor',5,3),
('Lightning','McQueen',6,NULL),
('Sarah','Brown',7,6);
    
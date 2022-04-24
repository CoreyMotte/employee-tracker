USE employee_db;

INSERT into department (name) VALUES ("Support");
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Management");

INSERT into role (title, salary, department_id) VALUES ("Support Associate", 45000, 1);
INSERT into role (title, salary, department_id) VALUES ("Support Manager", 60000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales Associate", 40000, 2);
INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 45000, 2);
INSERT into role (title, salary, department_id) VALUES ("Director", 80000, 3);
INSERT into role (title, salary, department_id) VALUES ("Owner", 100000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Corey", "Motte", 1, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, null);
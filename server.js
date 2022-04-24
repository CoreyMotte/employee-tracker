const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("\n Employee Database Management System \n");
    sysMenu();
});

function sysMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select the desired operation:",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function(response) {
            switch (response.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Departments":
                    viewAllDepartments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":

                    break;
                
                case "Add Department":

                    break;

                case "Add Role":

                    break;
                
                case "Update Employee Role":

                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function viewAllEmployees() {
    console.log("");
    var query = "SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary as salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        sysMenu();
    });
}

function viewAllDepartments() {
    console.log("");
    var query = "SELECT id, name AS department FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        sysMenu();
    });
}

function viewAllRoles() {
    console.log("");
    var query = "SELECT r.id, title AS role, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id";
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        sysMenu
    });
}
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// establish connection for SQL database
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
    queryDB();
});

function queryDB() {
    // function to get current roles, departments, and employees from database and store them as variables for later reference
    connection.query ("SELECT * from role", function(err, res) {
        roles = res.map(role => ({name: role.title, value: role.id}));
    });

    connection.query ("SELECT * from department", function(err, res) {
        depts = res.map(dept => ({name: dept.title, value: dept.id}));
    });

    connection.query("SELECT * from employee", function(error, res) {
        employees = res.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }));
    });
}

function sysMenu() {
    // main menu for the application
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select the desired operation:",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function(response) {
            switch (response.action) {
                // switch statement to handle each option of the menu
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;
                
                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;
                
                case "Update Employee Role":
                    updateRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewEmployees() {
    console.log("");
    var query = "SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary as salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        sysMenu();
    });
}

function viewDepartments() {
    console.log("");
    var query = "SELECT id, name AS department FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        sysMenu();
    });
}

function viewRoles() {
    console.log("");
    var query = "SELECT r.id, title AS role, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id";
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        sysMenu();
    });
}

function addEmployee() {
    queryDB();
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please input their FIRST name:"
            },
            {
                type: "input",
                name: "last_name",
                message: "Please input their LAST name:"
            },
            {
                type: "list",
                name: "role",
                message: "Please select their role:",
                choices: roles
            }
        ])
        .then(function(response) {
            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.table("\n New Employee Added! \n");
                    queryDB();
                    sysMenu();
                }
            )
        })
}

function addDepartment() {
    queryDB();
    inquirer
        .prompt([
            {
                type: "input",
                name: "newdept",
                message: "Please enter the name of the new department:"
            }
        ])
        .then(function(response) {
            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: response.newdept
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("\n New Department Added! \n");
                    queryDB();
                    sysMenu();
                }
            )
        });
}

function addRole() {
    queryDB();
    inquirer
        .prompt([
            {
                type: "input",
                name: "new_role",
                message: "Please input the name of the new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Please input the salary of this role:"
            },
            {
                type: "list",
                name: "dept",
                message: "Please select the department this role is in:",
                choices: depts
            }
        ])
        .then(function(response) {
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: response.new_role,
                    salary: response.salary,
                    department_id: response.dept
                },
                function(err, res) {
                    if (err) throw err;
                    console.table("\n New Role Added! \n");
                    queryDB();
                    sysMenu();
                }
            )
        })
}

function updateRole() {
    queryDB();
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: employees
        },
        {
          name: "role",
          type: "list",
          message: "Which role should be assigned to this employee?",
          choices: roles
        }
      ])
      .then(function(response) {
        var query = connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: response.role
            },
            {
              id: response.employee
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.table("\n Employee Role Updated! \n");
            queryDB();
            sysMenu();
          }
        );
      });
  }
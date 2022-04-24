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
});
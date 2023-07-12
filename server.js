const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const { mainMenu } = require("./assets/index");
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, rows) => {
    if (err) {
      console.log("Error executing query", err.message);
      return;
    }
    console.log("Employees");
    console.table(rows);
    mainMenu();
  });
}

function addEmployee() {
  console.log("addEmployee");
  mainMenu();
}

function updateEmployeeRole() {
  console.log("updateEmployeeRole");
  mainMenu();
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.log("Error executing query", err);
      return;
    }
    console.log("Departments");
    console.table(rows);
    mainMenu();
  });
}

function addDepartment() {
  console.log("addDepartment");
  mainMenu();
}

function quit() {
  console.log("quit");
  process.exit();
}

module.exports = {
  mainMenu,
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mainMenu(db);
});

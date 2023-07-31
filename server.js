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
      console.log("Error executing query" + err);
      return;
    }
    console.log("Employees");
    console.table(rows);
    mainMenu();
  });
}

function addEmployee() {
  db.query("SELECT id, title FROM role", (err, rows) => {
    if (err) {
      console.log("Error executing query" + err);
      return;
    }

    const roles = rows.map((row) => ({ name: row.title, value: row.id }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employees first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employees last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employees role?",
          choices: roles,
        },
        {
          type: "list",
          name: "manager",
          message: "What is the employees manager code?",
          choices: [1, 2, 3, 4],
        },
      ])
      .then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const roleId = answers.role;
        const managerId = answers.manager;

        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [firstName, lastName, roleId, managerId],
          (err) => {
            if (err) {
              console.error("Error adding employee" + err);
              return;
            }
            console.log(`${firstName} ${lastName} added`);
            mainMenu();
          }
        );
      });
  });
}

function updateEmployeeRole() {
  //query the roles from the db
  db.query("SELECT id, title FROM role", (err, rows) => {
    if (err) {
      console.log("Error executing query" + err);
      return;
    }

    const roles = rows.map((row) => ({ name: row.title, value: row.id }));

    //query the employees from the db from withing the role query
    db.query("SELECT * FROM employee", (err, rows) => {
      if (err) {
        console.log("Error executing query" + err);
        return;
      }
      const employees = rows.map((row) => `${row.first_name} ${row.last_name}`);

      //run the inquirer promt withing the employee query
      inquirer
        .prompt([
          {
            type: "list",
            name: "selectEmployee",
            message: "Whos role would you like to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "newRole",
            message: "Please enter the new role?",
            choices: roles,
          },
        ])
        .then((answers) => {
          const employeeName = answers.selectEmployee.split(" ");
          const firstName = employeeName[0];
          const lastName = employeeName[1];
          const newRoleId = answers.newRole;

          db.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
            [newRoleId, firstName, lastName],
            (err, result) => {
              if (err) {
                console.log("Error executing query", err.message);
                return;
              }
              console.log("Employee role updated");
              mainMenu();
            }
          );
        })
        .catch((err) => {
          console.error("Error during iquirer prompt" + err);
        });
    });
  });
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
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
      const departmentName = answer.newDepartment;

      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [departmentName],
        (err) => {
          if (err) {
            console.error("Error adding department" + err);
            return;
          }
          console.log(`${departmentName} department added`);
          mainMenu();
        }
      );
    });
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
  mainMenu();
});

const inquirer = require("inquirer");



function mainMenu() {
    inquirer.prompt([
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
                "Quit"
            ]
        }
    ]).then((answer) => { 
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
    })
}

function viewAllEmployees() { 
    console.log("viewAllEmployees");
    mainMenu();
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
    console.log("viewAllDepartments");
    mainMenu();
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
  mainMenu
};
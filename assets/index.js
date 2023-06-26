const inquirer = require("inquirer");

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "What would you like to do?",
            choices [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        }
    ])
}
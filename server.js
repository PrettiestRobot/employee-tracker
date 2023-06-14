const express = require('express');
const inquirer = require('inquirer');
const msql = require('mysql2');
const { exitCode } = require('process');


const PORT = process.env.PORT || 3001;
const app = express();


//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    }
)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "dumBfo%5", //Your password
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})
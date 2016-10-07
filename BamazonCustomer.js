var mysql = require('mysql');
var inquirer = require('inquirer');

var prompt = require('prompt');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "dumBfo%5", //Your password
    database: "bamazon"
})

connection.connect(function(err) {
     if (err) throw err;
     //console.log("connected as id " + connection.threadId);
});





function showproducts() {
     connection.query('SELECT * FROM products', function(err, products) {
     	if (err) throw err;
               console.log("Welcome!  These are the products we have for sale.");
               for(var i = 0; i < products.length; i++) {
          	console.log("Item ID: " + products[i].ItemID + " | Product: " + products[i].ProductName + " | Department: " + products[i].DepartmentName + " | Price: " +  products[i].Price + " | stockQuantity: " + products[i].StockQuantity);
          }

          inquirer.prompt([

          	// prompt customer for Item
          	{
          		type: "input",
          		message: "What is the Item ID of the item you would like to buy?",
          		name: "ItemID"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}

         
          //"then" run this function...

          ]).then(function (order) {
          	

                    var quantity = order.quantity;
                    var ItemID = order.ItemID;
                    connection.query('SELECT * FROM products WHERE ItemID=' + ItemID, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].StockQuantity - quantity >= 0) {
                              
                              

                                   //display total cost
                                   console.log(" ")
                              console.log("Your total cost is: ")
                              console.log(order.quantity * selectedItem[0].Price);
                              console.log(" ");

                              console.log(".........................................");
                              console.log(" ")


                              //  update the stockquantity in products.
                            
                              connection.query('UPDATE products SET StockQuantity=? WHERE ItemID=?', [selectedItem[0].StockQuantity - quantity, ItemID],
                              function(err, products) {
                              	if (err) throw err;


                                   // Runs the prompt again, so the user can keep shopping.  New products list reflects stockquantity update
                                   showproducts();
                              });  

                         }

                         else {
                              console.log("Insufficient quantity!");
                              showproducts();
                         }
                    });
          });
     });
}

showproducts();
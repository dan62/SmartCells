// Importing of all modules to be used on page
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
var Excel = require('exceljs');
const { Pool, Client } = require("pg");

// Adding a template engine to serve a frontend interface
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// PostgreSQL credentials to be inserted here
// Please adjust these according to your database settup
const pool = new Pool({
    user: "tester",
    host: "localhost",
    database: "test_db",
    password: "password",
    port: "5432"
});

// Declaration of variables to be used
var row_data = new Array()
var wb = new Excel.Workbook();
var path = require('path');
var filePath = path.resolve(__dirname, 'sample.xlsx');


// TODO (Project Phase 1):
/* 
   1. Extract the first row data and save them as column headers in an array
   2. Use the column headers array to create a database with such columns automatically
   3. Adjust the INSERT command to insert based on the columns array
   4. move all credentilas to a constants.json file
   5. Add a variety of databases support 
*/

// Declaration of endpoint that will initiate the processing of data when called
app.get('/home', (req, res) => {

    // Render a frontend on the http://localhost:3000/home in browser
    res.render('home');

    // Function for reading the excel file and performing operations on it
    wb.xlsx.readFile(filePath).then(function () {
        // Select the worksheet within the .xlsx file
        var sh = wb.getWorksheet("Sheet1");

        // Count the rows and columns and display it to user
        console.log('There are this many rows:' + sh.rowCount + ' and this many cell columns' + sh.columnCount);
        
        // For all the rows in the table
        for (rows = 1; rows <= sh.rowCount; rows++) {
            // Loop through the columns in the sheet
            for (columns = 1; columns <= sh.columnCount; columns++) {
                // Push the row data to the array
                row_data.push(sh.getRow(rows).getCell(columns).value); 
                // When loop has reached the max column count save the data
                if (sh.columnCount == columns) {
                    insert_records_to_pg(row_data);
                }
            }
            // Empty the row data and prepare for next row
            row_data = [];
        }
    });
});

// Function that inserts the student into PostgreSQL DB
function insert_records_to_pg(row_data) {
    console.log('This is row data > ' + row_data)
    pool.query(
        "INSERT INTO students(firstname, lastname, gender, country, age, date, Id)VALUES(" + row_data[0].toString() + "," + row_data[1].toString() + "," + row_data[2].toString() + "," + row_data[3].toString() + "," + row_data[4].toString() + "," + row_data[5].toString() + "," + row_data[6].toString() + "," + row_data[7].toString() + ")",
        (err, res) => {
            console.log(err, res);
            pool.end();
        }
    );
}

// Export module
module.exports = app;

// Host server on port 3000
app.listen(3000, function () {
    console.log("Server started please access frontend on http://localhost:3000/home");
});
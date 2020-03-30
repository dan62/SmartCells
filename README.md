# SmartCells
  Have you ever faced a situation where you have alot of data but to tired and lazy to develop custom methods to input this data to your database ? Smart Cells does this for you, we deturnmine the complex data 
This repository contains a NodeJS Application/APi that will: <br>
- Take any form of Excel workbook (currently .xlsx)
- Create a database based on the format 
- Store all row data in the chosen db of your choice on any server located worldwide

## Tech Stack
- NodeJS
- ExpressJS
- Mustache
- PostgreSQL
- SQL
- MySQL

## Geting Started
1. Clone this respository
2. Navigate to the cloned directory after unzipping it and run the following commands: <br>
```
npm install
node server.js
``` 
<br>
3. Navigate to your web browser and visit http://localhost/home , 
4. Input all the required information displayed on the frontend upload a ``` .xlsx ```  file and upload it 
5. The data should be inserted into the database in which you refferenced on the user Interface (UI), you should validate this step <br> <br>

* Inorder to configure database credentials and database type please update necessary variables in the ```.env```file

## Change Log
All changes should be recorded in the ``` CHANGELOG.MD ```  changes are made <br> <br>

## Contributing
Please feel free to contribute to this project by making a pull request on chnages yould like to bring inti the production branch we will get back to you as soon as possible.

const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// this will connect to mysql database not sure how to hide password 
const connection = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username,
        user: 'root',
        //mysql password
        password:'Gateway3!',
        database: 'tracker'

    },
    console.log("Connected ")
    
  );
   
// will need to create a connection function and initialize it
// db.connect(function(err) {
//     if (err) throw err;
    


// });
//These questions are used to populate the employee tracker database with an array of questions that are similiar to the module 9 homework assignment we did but with the exceptions of the switch, case, break statements that either match the expression to be used or break out of it. 
const cmdPrompt = () => {
      
   return inquirer.prompt ([
      {
        type: "list",
        name: "cmd",
        message:"Thank you for using the Employee Tracking Database. What would you like to do?",
        choices:["[VIEW] data", "[ADD] data","[UPDATE] data", "EXIT"],
    },
  ])
    //will then need a .then function with a switch case expression to compare, match and execute the code.
    .then(function (answer) {
        switch (answer.menu) {
          case "[VIEW] data":
            viewData();
            break;
          case "[ADD] data":
            addData();
            break;
          case "[UPDATE] data":
            updateData();
            break;
          case "EXIT":
            console.log("You have exited the appilcation!");
            connection.end();
            break;
        }
      });
    }
//will have to create a function for be able to view the data menu
const viewData = () => {
   
    return inquirer.prompt({
        name: "viewMenu",
        type: "list",
        message: "Please select the items you would like to VIEW?",
        choices: ["View Employees", "View Roles", "View Departments"],
      })
      .then(function (answer) {
        switch (answer.viewMenu) {
          case "See Employees":
            seeEmployees();
            break;
          case "See Roles":
            seeRoles();
            break;
          case "See Departments":
            seeDepartments();
            break;
        }
      });
  }

  /// This will be where you have to create a set of query functions and use the console table app that was installed per the homework request. And make sure to use LEFT JOIN TO CONNECT THE TABLES!!!

  function seeEmployees() {
    connection.query(
      "SELECT employee.first_name, employee.last_name, roles.title, roles.salary from employee LEFT JOIN roles on employee.roles_id = roles.id;",
      function (err, res) {
        console.table(res);
        init();
      }
    );
  }
  
  function seeRoles() {
    connection.query("SELECT * FROM roles;", function (err, res) {
      console.table(res);
      init();
    });
  }
  
  function seeDepartments() {
    connection.query("SELECT * FROM department;", function (err, res) {
      console.table(res);
      init();
    });
  }


  //This is where you will have to use inquirer again to prompt the add menu section AND ADD EMPLOYEE ROLES AND DEPARTMENT
  const addData = () => {
    
    return inquirer.prompt({
        name: "addMenu",
        type: "list",
        message: "What would you like to ADD?",
        choices: ["Add Employee", "Add Roles", "Add Department"],
      })
      .then(function (answer) {
        switch (answer.addMenu) {
          case "Add Employee":
              connection.query("SELECT * FROM roles;", function (err, results) {
                  if (err) throw err;
   
            inquirer
              .prompt([
                {
                  name: "addFirstName",
                  type: "input",
                  message: "Enter FIRST NAME: ",
                },
                {
                  name: "addLastName",
                  type: "input",
                  message: "Enter LAST NAME: ",
                },
                {
                  name: "selectRoles",
                  type: "list",
                  message: "Please select ROLES:",
    ///This is where you have to add an array to the choices and push into the string with the choices
                  choices: function () {
                      let choiceArray = [];
                      for (let i = 0; i < results.length; i++) {
                          choiceArray.push(i+1 + " " + results[i].title);
                      }
                      return choiceArray;
                  }
                }        
              ])
              .then(function (answer) {

               //make sure to parse integer in to roles  
                  let assignRolesID = parseInt(answer.assignRoles[0]);
                connection.query("INSERT INTO employee (first_name, last_name, roles_id) VALUES (?, ?, ?)",
                  [
                    answer.addEmployeeFirstName,
                    answer.addEmployeeLastName,
                    assignRolesID
                  ],
                  function (err, res) {
                    seeEmployees();
                  }
                );
              });
          });
            break;
          case "Add Roles":
            inquirer
              .prompt([
                {
                  name: "addRoles",
                  type: "input",
                  message: "What Roles to ADD: ",
                },
                {
                  name: "addSalary",
                  type: "input",
                  message: "What is the salary for Role?",
                },
              ])
              .then(function (answer) {
                connection.query(
                  "INSERT INTO roles (title, salary) values (?, ?)",
                  [answer.addRoles, answer.addSalary],
                  function (err, res) {
                    seeRoles();
                  }
                );
              });
            break;
          case "Add Department":
        ///this were you will add the department using inquirer again.
            inquirer
              .prompt({
                name: "addDepartment",
                type: "input",
                message: "Enter the name of the Department to ADD: ",
              })
              .then(function (answer) {
                connection.query(
                  "INERT INTO department (name) VALUES (?)",
                  answer.addDepartment,
                  function (err, res) {
                    seeDepartments();
                  }
                );
              });
            break;
        }
      });
  }
  ///this is where you will create a query function for the updated data
  function updateData() {
    connection.query("Select * FROM employee;", function (err, results) {
      if (err) throw err;
      inquirer
        .prompt({
          name: "updateChooseEmployee",
          type: "list",
          message: "Please select the employee to update: ",
          choices: function () {
/////make sure to add an array again for the choices
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(
                i + 1 + " " + results[i].first_name + " " + results[i].last_name
              );
            }
            return choiceArray;
          },
        })
        .then(function (answer) {
          let chosenEmployeeID = parseInt(answer.updateChooseEmployee[0]);
          connection.query("SELECT * FROM roles;", function (err, results) {
            if (err) throw err;
            inquirer
              .prompt({
                name: "updateEmployeeRole",
                type: "list",
                message: "Please select the new role: ",
                choices: function () {
        //have to create an array and push into the results  
                  let choiceArray = [];
                  for (let i = 0; i < results.length; i++) {
                    choiceArray.push(i + 1 + " " + results[i].title);
                  }
                  return choiceArray;
                },
              })
              .then(function (answer) {
                console.log(chosenEmployeeID);
                var updatedRoleID = parseInt(answer.updateEmployeeRole[0]);
                connection.query(
                  "UPDATE employee SET roles_id = ? WHERE id = ?;",
                  [updatedRoleID,
                  chosenEmployeeID],
                  function (err) {
                    if (err) throw err;
                    console.log("This role has been update!");
                    seeEmployees();
                  }
                );
              });
          });
        });
    });
  }

cmdPrompt ()

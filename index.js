const mysql = require('mysql2');
const inquirer = require('inquirer');


//connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username,
        user: 'root',
        //mysql password
        password:'Gateway3!',
        database: 'election'

    },
    console.log('Connected to the election database.')
);
// will need to create a connect function
db.connect(function() {

});



//will need to create a querty function
function querying() {
    db.query("SELECT * FROM ")
}

//These questions are used to populate the employee tracker database with an array of questions that I re-used from the read-me homework assignment.
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "Adding departments",
            message: "What would you like to do?",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log(`You need to enter a department!`);
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "what is the name of the department?: ",
            
        },
        {
            type: "input",
            name: "addRoles",
            message: "What would you like to do? ",
            
        },
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?",
            
        },
        
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            
        },
       
        {
            type: "input",
            name: "department ",
            message: "Which department does the role belong to? ",
            
        },
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name? ",
            
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name? ",
           
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is the employee's role? ",
           
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the employee's manager? ",
           
        },
        {
            type: "input",
            name: "updateRole",
            message: "Please update the employee role ",
           
        },
        {
            type: "list",
            name: "employees",
            message: "Which employee role would you like to update? ",
            choices: [
                " "
            ]
        },

    ]).then(function(answers) {
        const sql = `INSERT INTO department(roles_id, employee_id) VALUES (?,?)`;
    const params = [body.roles_id, body.employee_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  });

            
        })
    })
}  

module.exports = db;
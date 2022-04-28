




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

    ]);
}  
/// This is where you will it will write to the file and prompt the questions
function writeToFile(fileName, data) {
    console.log(data)
     fs.writeFileSync(path.join(process.cwd(), fileName), data,(err) => {
         if (err) throw err;

     });
}
//prompting the questions
function init() {
    promptUser().then(inquirerResponses =>{
        console.log('Generating README...');
        writeToFile('README.md', generateMarkdown({ ...inquirerResponses }));
    })
}

init()
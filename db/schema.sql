DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS employee;

USE tracker;

CREATE TABLE department (
   dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
   dept_name VARCHAR(50) NOT NULL,
-- PRIMARY KEY (dept_id) 
);

CREATE TABLE roles (
    roles_id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    dept_id INTEGER NOT NULL, 
    -- PRIMARY KEY (roles_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)   
);

 CREATE TABLE employee (
  emp_id INTEGER AUTO_INCREMENT ,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role_id INTEGER NOT NULL ,
  manager_id INTEGER, 
  PRIMARY KEY(emp_id),
  FOREIGN KEY (emp_role_id) REFERENCES roles(roles_id),
  FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);

/* inserting value for id and name in department*/
INSERT INTO department (id, name)
VALUES (1,"Sales"),
    (2,"Engineering"),
    (3,"Finance"),
    (4,"Legal");

/* inserting value for id,title, salary and department_id into role*/
INSERT INTO role (id, title, salary, department_id)
VALUES(1,"Sales Lead",100000, 1),
    (2,"Sales Person", 80000, 1),
    (3,"Lead Engineer",150000,2),
    (4,"Software Engineer",120000,2),
    (5,"Account Manager",160000,3),
    (6,"Accountant", 125000,3),
    (7,"Legal Team Lead", 250000,4),
    (8,"Lawyer", 190000,4);

/* inserting value for id ,fist_name, last_name,role_id,manager_id into employee*/
INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES(1,"Mike","Chan", 1, null),
    (2,"Tom","Allen", 2, 1),
    (3,"Sarah","Lourd",7,null);
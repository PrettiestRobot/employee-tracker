INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Manager', 60000.00, 1),
    ('Marketing Specialist', 50000.00, 2),
    ('Finance Analyst', 55000.00, 3),
    ('Sales Representative', 40000.00, 1),
    ('Marketing Coordinator', 45000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, 3),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Williams', 4, 2),
    ('David', 'Brown', 5, 2);

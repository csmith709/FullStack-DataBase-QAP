CREATE TABLE Client (
    client_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(100)
);

-- Insert data into the Client table
INSERT INTO Client (first_name, last_name, phone_number, email) VALUES
('John', 'Doe', '555-1234', 'john.doe@example.com'),
('Jane', 'Smith', '555-5678', 'jane.smith@example.com'),
('Emily', 'Jones', '555-8765', 'emily.jones@example.com');

-- Create the Employee table
CREATE TABLE Employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(100)
);

-- Insert data into the Employee table
INSERT INTO Employee (first_name, last_name, phone_number, email) VALUES
('Alice', 'Brown', '555-3456', 'alice.brown@spa.com'),
('Bob', 'White', '555-7890', 'bob.white@spa.com'),
('Charlie', 'Black', '555-4321', 'charlie.black@spa.com');

-- Create the Service table
CREATE TABLE Service (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    time_required INTEGER NOT NULL, -- Time required in minutes
    price DECIMAL(10, 2) NOT NULL
);

-- Insert data into the Service table
INSERT INTO Service (service_name, time_required, price) VALUES
('Massage', 60, 120.00),
('Facial', 130, 95.00),
('Manicure', 60, 65.00),
('Pedicure', 130, 100.00),
('Full Leg Wax', 45, 80.00),
('Bikini Wax', 15, 35.00);

CREATE TABLE Appointment (
    appointment_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES Client(client_id),
    service_id INTEGER REFERENCES Service(service_id),
    employee_id INTEGER REFERENCES Employee(employee_id),
    appointment_time TIMESTAMP NOT NULL
);

-- Insert data into the Appointment table
INSERT INTO Appointment (client_id, service_id, employee_id, appointment_time) VALUES
(1, 1, 1, '2024-07-20 10:00:00'),
(2, 2, 2, '2024-07-21 11:00:00'),
(3, 3, 3, '2024-07-22 12:00:00');
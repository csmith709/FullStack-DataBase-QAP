-- update_employee.sql
UPDATE Employee SET first_name = $1, last_name = $2, phone_number = $3, email = $4 WHERE employee_id = $5;

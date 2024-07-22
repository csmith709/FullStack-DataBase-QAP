-- insert_appointment.sql
INSERT INTO Appointment (client_id, service_id, employee_id, appointment_time)
VALUES ($1, $2, $3, $4);

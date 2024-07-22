-- update_appointment.sql
UPDATE Appointment
SET client_id = $1,
    service_id = $2,
    employee_id = $3,
    appointment_time = $4
WHERE appointment_id = $5;

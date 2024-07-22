// Import the pg package
const { Pool } = require('pg');

// Create a new pool instance with your PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',       // replace with your PostgreSQL username
  host: 'localhost',       // replace with your PostgreSQL host
  database: 'Spa', // replace with your PostgreSQL database name
  password: 'Keyin2021', // replace with your PostgreSQL password
  port: 5433,              // default PostgreSQL port
});

// Function to query the database
const query = (text, params) => pool.query(text, params);

// Function to add a new client
const addClient = async (first_name, last_name, email, phone) => {
  const text = `
      INSERT INTO Client (first_name, last_name, email, phone)
      VALUES ($1, $2, $3, $4);
  `;
  const values = [first_name, last_name, email, phone];
  try {
      const res = await query(text, values);
      return res;
  } catch (err) {
      throw err;
  }
};

// Function to update a client
const updateClient = async (id, first_name, last_name, email, phone_number) => {
  const text = `
    UPDATE Client
    SET first_name = $1,
        last_name = $2,
        email = $3,
        phone_number = $4
    WHERE client_id = $5;
  `;
  const values = [first_name, last_name, email, phone_number, id];
  try {
    const res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
};

// Function to update an appointment
const updateAppointment = async (client_id, service_id, employee_id, appointment_time, appointment_id) => {
  const text = `
    UPDATE Appointment
    SET client_id = $1,
        service_id = $2,
        employee_id = $3,
        appointment_time = $4
    WHERE appointment_id = $5;
  `;
  const values = [client_id, service_id, employee_id, appointment_time, appointment_id];
  try {
    const res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
};

// Function to add an appointment
const addAppointment = async (client_id, service_id, employee_id, appointment_time) => {
  const text = `
    INSERT INTO Appointment (client_id, service_id, employee_id, appointment_time)
    VALUES ($1, $2, $3, $4);
  `;
  const values = [client_id, service_id, employee_id, appointment_time];
  try {
    const res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
};

// Function to delete an appointment
const deleteAppointment = async (appointment_id) => {
  const text = `
    DELETE FROM Appointment WHERE appointment_id = $1;
  `;
  const values = [appointment_id];
  try {
    const res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
};

// Export the functions
module.exports = {
  query,
  addClient,
  updateClient, 
  updateAppointment,
  addAppointment,
  deleteAppointment,
};
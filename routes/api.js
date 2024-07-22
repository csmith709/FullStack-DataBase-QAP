const express = require('express');
const router = express.Router();
const db = require('../dal/dal');

// CLIENT ROUTES

// GET all clients
router.get('/clients', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Client');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET a specific client by ID
router.get('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM Client WHERE client_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST a new client
router.post('/clients', async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Client (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, phone_number, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update client
router.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const result = await db.query(
      'UPDATE Client SET first_name = $1, last_name = $2, phone_number = $3, email = $4 WHERE client_id = $5 RETURNING *',
      [first_name, last_name, phone_number, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PATCH update part of a client's information
router.patch('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];
  let query = 'UPDATE Client SET ';

  Object.keys(req.body).forEach((key, idx) => {
    fields.push(`${key} = $${idx + 1}`);
    values.push(req.body[key]);
  });

  query += fields.join(', ') + ' WHERE client_id = $' + (fields.length + 1) + ' RETURNING *';
  values.push(id);

  try {
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE a client
router.delete('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Client WHERE client_id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// APPOINTMENT ROUTES

// GET all appointments
router.get('/appointments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Appointment');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET a specific appointment by ID
router.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM Appointment WHERE appointment_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST a new appointment
router.post('/appointments', async (req, res) => {
  const { client_id, service_id, employee_id, appointment_time } = req.body;
  try {
    const result = await db.addAppointment(client_id, service_id, employee_id, appointment_time);
    res.status(201).send('Appointment added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update appointment
router.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { client_id, service_id, employee_id, appointment_time } = req.body;
  try {
    const result = await db.updateAppointment(client_id, service_id, employee_id, appointment_time, id);
    res.status(200).send('Appointment updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE an appointment
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteAppointment(id);
    res.status(200).send('Appointment deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

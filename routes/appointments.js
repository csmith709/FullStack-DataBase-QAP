const express = require('express');
const router = express.Router();
const db = require('../dal/dal');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Appointment');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET a specific appointment by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM Appointment WHERE appointment_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST a new appointment
router.post('/', async (req, res) => {
  const { client_id, service_id, employee_id, appointment_time } = req.body;
  try {
    const result = await db.addAppointment(client_id, service_id, employee_id, appointment_time);
    res.status(201).send('Appointment added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update appointment
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteAppointment(id);
    res.status(200).send('Appointment deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

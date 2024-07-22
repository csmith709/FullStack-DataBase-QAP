const express = require('express');
const router = express.Router();
const db = require('../dal/dal');


// GET success page for update
router.get('/update-success', (req, res) => {
    const { operation, type, id } = req.query;
    res.render('updateSuccess', { operation, type, id });
});

// CLIENT ROUTES

// Render form to add a new client
router.get('/clients/add', (req, res) => {
    res.render('addClient'); // Ensure this matches the EJS filename
});

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
      // Insert client into the database
      await db.query(
        'INSERT INTO Client (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, phone_number, email]
      );
      res.redirect('/update-success?operation=add&type=client');
    } catch (error) {
      res.status(500).send('Error adding client');
    }
  });  

// Render form to edit a client
router.get('/clients/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Client WHERE client_id = $1', [id]);
        res.render('editClient', { client: result.rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT update client
router.put('/clients/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_number, email } = req.body;
    try {
        await db.query(
            'UPDATE Client SET first_name = $1, last_name = $2, phone_number = $3, email = $4 WHERE client_id = $5',
            [first_name, last_name, phone_number, email, parseInt(id)] // Ensure id is an integer
        );
        res.redirect(`/update-success?type=client&id=${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Render form to delete a client
router.get('/clients/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Client WHERE client_id = $1', [id]);
        res.render('deleteClient', { client: result.rows[0] });
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

// EMPLOYEE ROUTES

// Render form to add a new employee
router.get('/employees/add', (req, res) => {
    res.render('addEmployee'); // Ensure this matches the EJS filename
});

// GET all employees
router.get('/employees', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Employee');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET a specific employee by ID
router.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Employee WHERE employee_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST a new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, phone_number, email } = req.body;

    if (!first_name || !last_name || !phone_number || !email) {
        return res.status(400).send('Missing required fields');
    }

    try {
        // Insert employee into the database
        await db.query('INSERT INTO Employee (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4)', [first_name, last_name, phone_number, email]);
        res.redirect('/update-success?operation=add&type=employee');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Render form to edit an employee
router.get('/employees/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Employee WHERE employee_id = $1', [id]);
        res.render('editEmployee', { employee: result.rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT update employee
router.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_number, email } = req.body;
    try {
        await db.query(
            'UPDATE Employee SET first_name = $1, last_name = $2, phone_number = $3, email = $4 WHERE employee_id = $5',
            [first_name, last_name, phone_number, email, parseInt(id)] // Ensure id is an integer
        );
        res.redirect(`/update-success?type=employee&id=${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Render delete confirmation page
router.get('/employees/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Employee WHERE employee_id = $1', [id]);
        res.render('deleteEmployee', { employeeId: id });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE an employee
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Employee WHERE employee_id = $1', [id]);
        res.redirect('/update-success?operation=delete&type=employee');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// APPOINTMENT ROUTES

// Render form to add a new appointment
router.get('/appointments/add', (req, res) => {
    res.render('addAppointment'); // Ensure this matches the EJS filename
});

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
// routes/api.js
router.post('/appointments', async (req, res) => {
    const { client_id, service_id, employee_id, appointment_time } = req.body;
  
    if (!client_id || !service_id || !employee_id || !appointment_time) {
      return res.status(400).send('Missing required fields');
    }
  
    try {
      // Your logic to add an appointment to the database
      // Example:
      await db.query('INSERT INTO Appointment (client_id, service_id, employee_id, appointment_time) VALUES ($1, $2, $3, $4)', [client_id, service_id, employee_id, appointment_time]);
  
      res.status(200).send('Appointment added');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  

// Render form to edit an appointment
router.get('/appointments/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Appointment WHERE appointment_id = $1', [id]);
        res.render('editAppointment', { appointment: result.rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT update appointment
router.put('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { client_id, service_id, employee_id, appointment_time } = req.body;
    try {
        await db.query(
            'UPDATE Appointment SET client_id = $1, service_id = $2, employee_id = $3, appointment_time = $4 WHERE appointment_id = $5',
            [client_id, service_id, employee_id, appointment_time, parseInt(id)] // Ensure id is an integer
        );
        res.redirect(`/update-success?type=appointment&id=${id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Render form to delete an appointment
router.get('/appointments/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Appointment WHERE appointment_id = $1', [id]);
        res.render('deleteAppointment', { appointment: result.rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE an appointment
router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Appointment WHERE appointment_id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

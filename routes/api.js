const express = require('express');
const router = express.Router();
const db = require('../dal/dal');

// GET success page for update
router.get('/update-success', (req, res) => {
    const { type, id } = req.query;
    res.render('updateSuccess', { type, id });
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

// Render form to add a new client
router.get('/clients/add', (req, res) => {
  res.render('addClient');
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
        [first_name, last_name, phone_number, email, id]
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

// Render form to add a new employee
router.get('/employees/add', (req, res) => {
  res.render('addEmployee');
});

// POST a new employee
router.post('/employees', async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Employee (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, phone_number, email]
    );
    res.status(201).json(result.rows[0]);
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
        [first_name, last_name, phone_number, email, id]
      );
      res.redirect(`/update-success?type=employee&id=${id}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Render form to delete an employee
router.get('/employees/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM Employee WHERE employee_id = $1', [id]);
    res.render('deleteEmployee', { employee: result.rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE an employee
router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Employee WHERE employee_id = $1', [id]);
    res.status(204).send();
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

// Render form to add a new appointment
router.get('/appointments/add', (req, res) => {
  res.render('addAppointment');
});

// POST a new appointment
router.post('/appointments', async (req, res) => {
  const { client_id, service_id, employee_id, appointment_time } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Appointment (client_id, service_id, employee_id, appointment_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [client_id, service_id, employee_id, appointment_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
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
      await db.updateAppointment(client_id, service_id, employee_id, appointment_time, id);
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

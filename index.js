const express = require('express');
const methodOverride = require('method-override');
const apiRoutes = require('./routes/api');
const db = require('./dal/dal');  // Import your database module
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public')); // To serve static files

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.use('/api', apiRoutes);

// Add route handler directly
app.get('/update-success', (req, res) => {
    const { type, id } = req.query;
    res.render('updateSuccess', { type, id });
});

// Root route
app.get('/', async (req, res) => {
    try {
      const clientsResult = await db.query('SELECT * FROM Client');
      const employeesResult = await db.query('SELECT * FROM Employee');
      const appointmentsResult = await db.query('SELECT * FROM Appointment');
  
      res.render('index', {
        clients: clientsResult.rows,
        employees: employeesResult.rows,
        appointments: appointmentsResult.rows
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

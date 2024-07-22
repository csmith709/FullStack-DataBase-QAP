const express = require('express');
const methodOverride = require('method-override');
const apiRoutes = require('./routes/api');
const app = express();
const port = 3000;
const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

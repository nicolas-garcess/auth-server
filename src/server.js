const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes');

const app = express();

// Cors
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al servidor');
});

app.use('/api/user', authRoutes);

module.exports = app;

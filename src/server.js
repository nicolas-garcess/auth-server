const express = require('express');
require('dotenv').config();

const app = express();

// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al servidor');
});

module.exports = app;

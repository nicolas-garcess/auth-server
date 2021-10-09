const express = require('express');

const app = express();

console.log(process.env.PORT);
// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al servidor');
});

module.exports = app;

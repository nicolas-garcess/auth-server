/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      message: 'Acceso denegado',
      error: true,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Token no es válido',
      error: true,
    });
  }
};

module.exports = validateToken;

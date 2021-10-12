const { decode } = require('../services');

const verifyResearcher = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(404).json({
      message: 'No hay token',
      error: true,
    });
  }

  try {
    const verified = decode(token);

    if (verified.rol === 'researcher') {
      req.user = verified;
      return next();
    }

    return res.status(403).json({
      message: 'Acceso denegado',
      error: true,
    });
  } catch (err) {
    return res.status(401).json({
      message: 'El token no es válido',
      error: true,
    });
  }
};

const verifyStudent = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(404).json({
      message: 'No hay token',
      error: true,
    });
  }

  try {
    const verified = decode(token);

    if (verified.rol === 'student') {
      req.user = verified;
      return next();
    }

    return res.status(403).json({
      message: 'Acceso denegado',
      error: true,
    });
  } catch (err) {
    return res.status(401).json({
      message: 'El token no es válido',
      error: true,
    });
  }
};

module.exports = {
  verifyResearcher,
  verifyStudent,
};

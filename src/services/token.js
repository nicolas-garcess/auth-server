const jwt = require('jsonwebtoken');

const decode = (token) => {
  const verified = jwt.verify(token, process.env.SECRET_TOKEN);

  return verified;
};

const encode = (user, rol) => {
  const token = jwt.sign({
    id: user.id,
    projectId: user.idProyecto,
    rol,
  },
  process.env.SECRET_TOKEN,
  {
    expiresIn: '2h',
  });

  return token;
};

module.exports = {
  decode,
  encode,
};

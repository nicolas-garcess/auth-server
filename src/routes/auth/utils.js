const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    projectId: user.idProyecto,
  }, process.env.SECRET_TOKEN);

  return token;
};

const hashPassword = async (password, numberOfSalts) => {
  const salt = await bcrypt.genSalt(numberOfSalts);
  return bcrypt.hash(password, salt);
};

const isAValidPassword = async (reqPassword, savedPassword) => (
  bcrypt.compare(reqPassword, savedPassword)
);

module.exports = {
  createToken,
  hashPassword,
  isAValidPassword,
};

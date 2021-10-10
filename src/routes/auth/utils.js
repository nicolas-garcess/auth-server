const bcrypt = require('bcrypt');

const hashPassword = async (password, numberOfSalts) => {
  const salt = await bcrypt.genSalt(numberOfSalts);
  return bcrypt.hash(password, salt);
};

const isAValidPassword = async (reqPassword, savedPassword) => (
  bcrypt.compare(reqPassword, savedPassword)
);

module.exports = {
  hashPassword,
  isAValidPassword,
};

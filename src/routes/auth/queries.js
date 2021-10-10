const { Researcher, Student } = require('../../user');

const findResearcherByEmail = async (email) => Researcher.findOne({ email });
const findStudentByEmail = async (email) => Student.findOne({ email });

module.exports = {
  findResearcherByEmail,
  findStudentByEmail,
};

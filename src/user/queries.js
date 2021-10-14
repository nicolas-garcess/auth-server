const Researcher = require('./researchers.model');
const Student = require('./students.model');

const findResearcherByEmail = async (email) => Researcher.findOne({ email });
const findStudentByEmail = async (email) => Student.findOne({ email });

module.exports = {
  findResearcherByEmail,
  findStudentByEmail,
};

const router = require('express').Router();
const { Researcher, Student } = require('../../user');
const { schemaResearcherSignUp, schemaStudentSignUp } = require('./validations');
const { hashPassword } = require('./utils');

router.post('/singup-researcher', async (req, res) => {
  const { error } = schemaResearcherSignUp.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Wrong body request',
      error: error.details[0].message,
    });
  }

  const hashedPassword = await hashPassword(req.body.contrasena, 10);
  const researcher = new Researcher({
    ...req.body,
    contrasena: hashedPassword,
  });

  try {
    const researcherDB = await researcher.save();

    return res.status(201).json({
      message: `${researcherDB.id} researcher was created succesfully`,
      error: null,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Something went wrong',
      error: err,
    });
  }
});

router.post('/singup-student', async (req, res) => {
  const { error } = schemaStudentSignUp.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Wrong body request',
      error: error.details[0].message,
    });
  }

  const hashedPassword = await hashPassword(req.body.contrasena, 10);
  const student = new Student({
    ...req.body,
    contrasena: hashedPassword,
  });

  try {
    const studentDB = await student.save();

    return res.status(201).json({
      message: `${studentDB.id} student was created succesfully`,
      error: null,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Something went wrong',
      error: err,
    });
  }
});

module.exports = router;

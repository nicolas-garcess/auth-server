const router = require('express').Router();
const { Student } = require('../../student');
const { schemaStudentSignUp } = require('./validations');
const { hashPassword } = require('./utils');

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
      message: `${studentDB.id} student created succesfully`,
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

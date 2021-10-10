const router = require('express').Router();
const { Researcher, Student } = require('../../user');
const { findResearcherByEmail, findStudentByEmail } = require('./queries');
const { schemaResearcherSignUp, schemaStudentSignUp, schemaUserLogin } = require('./validations');
const { createToken, hashPassword, isAValidPassword } = require('./utils');

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

router.post('/login', async (req, res) => {
  const { error } = schemaUserLogin.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Wrong body request',
      error: error.details[0].message,
    });
  }

  const student = await findStudentByEmail(req.body.email);
  let validPassword = false;

  if (student !== null) {
    validPassword = await isAValidPassword(req.body.password, student.contrasena);

    if (!validPassword) {
      return res.status(404).json({
        message: 'Credenciales inválidas',
        error: true,
      });
    }

    const token = createToken(student);

    return res.status(200).header('auth-token', token).json({
      message: 'Bienvenido',
      error: null,
    });
  }

  const researcher = await findResearcherByEmail(req.body.email);

  if (researcher !== null) {
    validPassword = await isAValidPassword(req.body.password, researcher.contrasena);

    if (!validPassword) {
      return res.status(404).json({
        message: 'Credenciales inválidas',
        error: true,
      });
    }

    const token = createToken(researcher);

    return res.status(200).header('auth-token', token).json({
      message: 'Bienvenido',
      error: null,
    });
  }

  return res.status(404).json({
    message: 'Credenciales inválidas',
    error: true,
  });
});

module.exports = router;

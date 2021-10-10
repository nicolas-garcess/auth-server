const router = require('express').Router();
const { Student } = require('../../student');

router.post('/singup-student', async (req, res) => {
  const student = new Student({
    ...req.body,
  });

  try {
    const studentDB = await student.save();

    res.status(201).json({
      message: `${studentDB.id} student created succesfully`,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      error,
    });
  }
});

module.exports = router;

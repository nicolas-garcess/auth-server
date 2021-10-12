const router = require('express').Router();
const { userController } = require('../../user');
const auth = require('../../middleware');

router.post('/login', userController.login);
router.post('/singup-researcher', auth.verifyResearcher, userController.signUpResearcher);
router.post('/singup-student', auth.verifyResearcher, userController.signUpStudent);

module.exports = router;

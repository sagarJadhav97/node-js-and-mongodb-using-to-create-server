const router = require('express').Router();

const { signUpLab,verifyOtp } = require('../LabControllers/labRegistrationController');
const { personalDataAdd } = require('../LabControllers/personalDetailsAddController');
const { labDataAdd } = require('../LabControllers/labDetailsAddController');
const { labLogiNUser } = require('../LabControllers/loginSystemAuth');
const { labAppointmentUser } = require('../LabControllers/lapAppointment');

router.route('/number/accept').post(signUpLab);//------------------------------- complete , dataEnterSingup
router.route('/number/verify').post(verifyOtp);
router.route('/personal_details/:id').put(personalDataAdd);
router.route('/labDetails/:id').put(labDataAdd);
router.route('/lab/login/').post(labLogiNUser);
router.route('/lab/appointment/').post(labAppointmentUser);




module.exports = router;
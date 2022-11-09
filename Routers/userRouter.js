const router = require('express').Router();
const { signUp, verifyOtp, dataEnterSingup} = require('../Controllers/userController');
const { locationEnginSet } = require('../DoctorControllers/locationController');
const {careDoctorList} = require('../DoctorControllers/searchDoctorController');
const { bookDoctorDataStorenew } = require('../Controllers/appointmentController');
const { bookDoctorDataDis,bookDoctorDataDelete } = require('../DoctorControllers/doctorAppointmentController');
router.route('/number/accept').post(signUp);//------------------------------- complete
router.route('/number/otp/verification').post(verifyOtp);//-------------------------------complete
router.route('/data/Display/totakecare/:id').get(dataEnterSingup);//-------------------------------complete
router.route('/primaryDisplayData/Save/:id').put(dataEnterSingup);//-------------------------------complete
router.route('/locationSearch/Doctor/:city').get(locationEnginSet);//-------------------------------complete
router.route('/totakecare/Doctor/Search/:key').get(careDoctorList);//-------------------------------Incomplete
// router.route('/Lab/totakecare/Data/Search').get(labDataList);//-------------------------------Incomplete
router.route('/AppointmentWindow/Show/').post(bookDoctorDataStorenew);//-------------------------------complete
router.route('/AppointmentWindow/Doctor/data/:doctorid').get(bookDoctorDataDis);//-------------------------------Incomplete
router.route('/AppointmentWindow/Doctor/userdata/delete').put(bookDoctorDataDelete);//-------------------------------Incomplete
// router.route('/userData/Record/Store/totake').post(userHistoryShow);//-------------------------------Incomplete
// router.route('/DocumentUpload/totakecare/UserPRV').post(docUploadTotake);//-------------------------------Incomplete
// router.route('/appointmentList/TotakeCare/User').post(careDoctorList);//-------------------------------Incomplete

module.exports = router;
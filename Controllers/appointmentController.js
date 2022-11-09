const { updateUser } = require('../model/appointmentModel');
const { doctorPationDetails } = require('../model/doctorAppointmentModel');
const { recordUserSend } = require('../model/userAppointmentRecordModel');
const { doctorrecord } = require('../model/doctorRecordModel');
const decode = require('node-base64-image').decode;
module.exports.bookDoctorDataStorenew = async (req, res) => {

const cp = req.body.doctor_profile;

    await decode(cp, { fname: 'image', ext: 'jpg' });

            // //add database number or user id
            // const appoitmentDataSave = new updateUser({userid:req.params.userid,doctorid:req.body.doctorid,name:req.body.name,doctorimage:req.body.doctorimage,specialization:req.body.specialization,clinicName:req.body.clinicName,degree:req.body.degree,Address:req.body.Address,city:req.body.city,state:req.body.state,bookingDate:req.body.bookingDate,bookingTime:req.body.bookingTime});
            // const doctorAppointmentSave = new doctorPationDetails({userid:req.params.userid,doctorid:req.body.doctorid,pationname:req.body.pationname,pationimage:req.body.pationimage,bookingDate:req.body.bookingDate,bookingTime:req.body.bookingTime})
            // const recordAddWindow = new recordUserSend({doctorid:req.body.doctorid,name:req.body.name,doctorimage:req.body.doctorimage,specialization:req.body.specialization,clinicName:req.body.clinicName,degree:req.body.degree,Address:req.body.Address,userid:req.params.userid,pationname:req.body.pationname,pationimage:req.body.pationimage,bookingDate:req.body.bookingDate,bookingTime:req.body.bookingTime,healthdiagnose:"",prescribemedicine:"",suggesttest:""})
            // const docrecordStore = new doctorrecord({doctorid:req.body.doctorid,userid:req.params.userid,pationname:req.body.pationname,pationimage:req.body.pationimage,bookingDate:req.body.bookingDate,bookingTime:req.body.bookingTime,healthdiagnose:"",prescribemedicine:"",suggesttest:""})
            // const ressult = await appoitmentDataSave.save();
            // const docSave = await doctorAppointmentSave.save();
            // const recordSaveUserDetails = await recordAddWindow.save();
            // const rdRo = await docrecordStore.save();

            // return res.status(200).send({
            //     message: "User Registration Successfully",
            //     data: ressult,
            //     info:docSave,
            //     record:recordSaveUserDetails,
            //     doctor:rdRo
            // });



        }
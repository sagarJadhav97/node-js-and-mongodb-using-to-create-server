const { labdataSet } = require('../model/labRegModel');

module.exports.labAppointmentUser = async (req, res) => {
            //add database number or user id
             //user data accept
             const labRegDataSave = new labdataSet({lab_profile_img:req.body.lab_profile_img,
             labuserid:req.body.labuserid,
             labname:req.body.labname,labtime:req.body.labtime,
             labcontactno:req.body.labcontactno,lab_address:req.body.lab_address})
            const labappointdata = await labRegDataSave.save();

            return res.status(200).send({
                message: "User Registration Successfully",
                data: labappointdata
            });

        }

        //user data set lab data 
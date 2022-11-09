const { doctorPationDetails } = require('../model/doctorAppointmentModel');
const { recordUserSend } = require('../model/userAppointmentRecordModel');
const { updateUser } = require('../model/appointmentModel');
const { doctorrecord } = require('../model/doctorRecordModel');


module.exports.bookDoctorDataDis = async (req, res) => {
    var regex = new RegExp(req.params.doctorid);    
    let result = await doctorPationDetails.find({
        "$or":[
               {"doctorid":regex}
              ]
    })
    if(result.length == 0){
        res.status(404).send("No data Found")//android update for android and mongodb conncetio .send replace json
    }
    else{
        return res.status(200).json({
                    data:result
                })
        }           
}


module.exports.bookDoctorDataDelete = async (req, res) => {
    var recordUid = await recordUserSend.find({
        userid: req.body.userid,
        doctorid:req.body.doctorid
    });
    
        if(recordUid.length === 0 ){
            res.status(404).send("Enter Wrong Details")
        }else{
        const recWindStore = await recordUserSend.findOne({$and:[{userid:req.body.userid},{doctorid:req.body.doctorid},{status:true}]}).select({_id:1}).updateOne({
            $set:{
                status:false,
                healthdiagnose:req.body.healthdiagnose,
                prescribemedicine:req.body.prescribemedicine,
                suggesttest:req.body.suggesttest
            }
        })

        const docRec = await doctorrecord.findOne({$and:[{userid:req.body.userid},{doctorid:req.body.doctorid},{status:true}]}).select({_id:1}).updateOne({
            $set:{
                status:false,
                healthdiagnose:req.body.healthdiagnose,
                prescribemedicine:req.body.prescribemedicine,
                suggesttest:req.body.suggesttest
            }
        })

        const appointmentDelete = await updateUser.findOne({$and:[{userid:req.body.userid},{doctorid:req.body.doctorid},{status:true}]}).select({_id:1}).deleteMany({
            userid:req.body.userid
        });
        
        const doctorsidedelete = await doctorPationDetails.findOne({$and:[{userid:req.body.userid},{doctorid:req.body.doctorid}]}).select({_id:1}).deleteMany({
            userid:req.body.userid
        });
        
        res.status(200).json({
        data:recWindStore,
        doctor:docRec,
        delete:appointmentDelete,
        doctorAppoitment:doctorsidedelete       
    })}
}
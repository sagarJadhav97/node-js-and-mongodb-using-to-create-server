const bcrypt = require("bcrypt");
const _ = require("lodash")
const axios = require("axios");
const dotenv = require('dotenv').config();
const { labdataSet } = require('../model/labRegModel');


module.exports.labDataAdd = async (req, res) => {
   //data update
   const user = new labdataSet(_.pick(req.body));
   const token = user.generateJWT();

   await labdataSet.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            labname:req.body.labname,
            labcontactno:req.body.labcontactno,
            coursename:req.body.coursename,
            course_reg_no:req.body.course_reg_no,
            course_reg_date:req.body.course_reg_date,
            course_reg_validup:req.body.course_reg_validup,
            lab_address:req.body.lab_address,
            labtime:req.body.labtime,
            tokens:[{token:token}]
        }
    },{new:true}).then(result=>{
        res.status(200).json({
            data:result
        })
       
    }).catch(err=>{
        console.log(err);
        res.status(404).send(err)
    })        
}

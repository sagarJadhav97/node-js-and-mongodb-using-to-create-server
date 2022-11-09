const bcrypt = require("bcrypt");
const _ = require("lodash")
const axios = require("axios");
const dotenv = require('dotenv').config();
const { labdataSet } = require('../model/labRegModel');


module.exports.personalDataAdd = async (req, res) => {
   //data update
   await labdataSet.findByIdAndUpdate({_id:req.params.id},{
        $set:{
                userfirst:req.body.userfirst,
                userfathername:req.body.userfathername,
                usersurname:req.body.usersurname,
                dob:req.body.dob,
                aadharno:req.body.aadharno,
                currentadress:req.body.currentadress
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

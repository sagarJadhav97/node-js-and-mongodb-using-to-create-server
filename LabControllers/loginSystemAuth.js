const bcrypt = require("bcrypt");
const _ = require("lodash")
const dotenv = require('dotenv').config();
const { labdataSet } = require('../model/labRegModel');



module.exports.labLogiNUser = async (req, res,next) => {
    // const docRec = await labdataSet.findOne({$and:[{useremail_id:req.body.useremail_id}]});
    // if(docRec)
    const user1 = await labdataSet.findOne({
        useremail_id: req.body.useremail_id
    });
    if(user1){
        const validUser = await bcrypt.compare(req.body.user_email_pass,user1.user_email_pass);
        if(validUser){
            const user = new labdataSet(_.pick(req.body));
            const token = user.generateJWT();
        //data save
        const docRec = await labdataSet.findOne({$and:[{useremail_id: req.body.useremail_id}]}).updateOne({
            $push:{
                tokens:[{token:token}]
            }
        });

        return res.status(200).send({
            data: docRec,
            userto:token
        });

         
        }else{
            return res.status(500).send({
                msg:"wrong password"
               
            });

        }
    }else{
        console.log("email else")
    }
   
       
}

//pending work for login lab section for lab users browser save cookies and login time automatically chaeck user is valid 
//all lab section program ready pading login section
//lab appoitment section
//histroy section

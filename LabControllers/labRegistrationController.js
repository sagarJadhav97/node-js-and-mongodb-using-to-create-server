const bcrypt = require("bcrypt");
const _ = require("lodash")
const axios = require("axios");
const otpGenerator = require("otp-generator");
const dotenv = require('dotenv').config();
const { Otp } = require('../model/otpModel');
const { labdataSet } = require('../model/labRegModel');


const fast2sms = require('fast-two-sms');

module.exports.signUpLab = async (req, res) => {
    //check user already registration
    const labuser = await labdataSet.findOne({
        user_number: req.body.user_number
    }); 
 //check user already registration
    if(labuser){
        res.send("alread presend")//--------------------------------(pending)
    }else{
        const OTP = otpGenerator.generate(4, {
            digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
        });
        //password set variabel
        const user_email_pass = req.body.user_email_pass;
        
        //id set for lab
        const uidsetlab = otpGenerator.generate(6, {
            digits: true, upperCaseAlphabets: false, specialChars: true, lowerCaseAlphabets: true
        });

        const phone = req.body.user_number;
        console.log(OTP);
        console.log(phone);
        
        
        //api call for sms-----------------------------------------------------------------------------------------------------
        // var unirest = require("unirest");
        // var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        // req.headers({
        //     "authorization": process.env.API_KEY_SMS
        // });
    
        // req.form({
        //     "variables_values": `${OTP} valid 10 min after expire.`,
        //     "route": "otp",
        //     "numbers": phone,
        // });
    
        // req.end(function (res) {
        //     if (res.error) throw new Error(res.error);
        //     console.log(res.body);
        // });
          
            
            //user data accept
            const labRegDataSave = new labdataSet({userfirst:"",
                userfathername:"",usersurname:"",
                dob:"",user_number:req.body.user_number,labuserid:uidsetlab,
                useremail_id:req.body.useremail_id,user_email_pass:user_email_pass,
                aadharno:"",currentadress:"",labname:"",labtime:"",
                labcontactno:"",coursename:"",course_reg_no:"",course_reg_date:"",course_reg_validup:"",lab_address:"",tokens:[]}) 
       
                //password save
        const salt1 = await bcrypt.genSalt(10);
        labRegDataSave.user_email_pass = await bcrypt.hash(labRegDataSave.user_email_pass, salt1);      

            const otp = new Otp({ number:phone, otp: OTP });
            const salt = await bcrypt.genSalt(10)
            otp.otp = await bcrypt.hash(otp.otp, salt);
        

        //data save    
        const result = await otp.save();
        const result1 = await labRegDataSave.save();

        return res.status(200).send({
            message: "Otp Send successfully!",
            data: result,
            user:result1
        });
         
    
    }
    
    
    
}


module.exports.verifyOtp = async (req, res) => {
    const labuser = await labdataSet.findOne({
        user_number: req.body.user_number
    });

    if (labuser) {
        res.send("already peding")
    
    } else {
        const otpHolder = await Otp.find({
            number: req.body.number
        });
        if (otpHolder.length === 0) return res.status(400).send("you use an expired OTP");
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

        if (rightOtpFind.number === req.body.number && validUser) {
        const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number
            });
            return res.status(200).send({
                message: "User Registration Successfully",
            });

        } else {
            return res.status(400).send("your OTP Was Wrong")
        }
    }
}

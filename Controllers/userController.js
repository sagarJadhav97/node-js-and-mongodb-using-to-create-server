const bcrypt = require("bcrypt");
const _ = require("lodash")
const axios = require("axios");
const otpGenerator = require("otp-generator");
const dotenv = require('dotenv').config();
const { User } = require('../model/userModel');
const { Otp } = require('../model/otpModel');
const { updateUser } = require('../model/alreadyUserUpdate');

const fast2sms = require('fast-two-sms');


module.exports.signUp = async (req, res) => {
    //check user already registration
    const OTP = otpGenerator.generate(4, {
        digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
    });
    const phone = req.body.number;
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
    const otp = new Otp({ number: phone, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send({
        message: "Otp Send successfully!",
        data: result
    });
}


module.exports.verifyOtp = async (req, res) => {
    const user = await User.findOne({
        number: req.body.number
    });

    if (user) {
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
            console.log("worg")
            return res.status(200).send({
                data: user,
            });

        } else {
            return res.status(400).send("your OTP Was Wrong")
        }
    } else {
        const otpHolder = await Otp.find({
            number: req.body.number
        });
        if (otpHolder.length === 0) return res.status(400).send("you use an expired OTP");
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

        if (rightOtpFind.number === req.body.number && validUser) {

            const user = new User(_.pick(req.body, ["number"]));

            const unid_set = otpGenerator.generate(6, {
                digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
            });
            //add database number or user id
            const Upuser = new updateUser({ name:"",number: req.body.number, your_id: unid_set, email_id:"",address:"",aadhaar_no:"",height:"",weight:"",age:"",blood_group:"",Image_src:"",reportdocumentimages:[{reportimage:"",reprotdescr:""}]});
            const token = user.generateJWT();
            const result = await user.save();
            const ressult = await Upuser.save();
            const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number
            });
            return res.status(200).send({
                message: "User Registration Successfully",
                token: token,
                data: ressult
            });

        } else {
            return res.status(400).send("your OTP Was Wrong")
        }
    }
}
//data search and display
module.exports.dataEnterSingup = async (req, res) => {

  

    updateUser.findById(req.params._id).then(resultaa=>{
        res.status(200).json({
            data:resultaa
        })
       
    }).catch(err=>{
        console.log.apply(err);
        res.status(404).send("Wrong id enter")
    })
}

//user data update name etc..
module.exports.dataEnterSingup = async(req, res) =>{
    updateUser.findByIdAndUpdate({_id:req.params.id},{
        $set:{
        number: req.body.number,
        name:req.body.name,
        email_id:req.body.email_id,
        address:req.body.address,
        aadhaar_no:req.body.aadhaar_no,
        height:req.body.height,
        weight:req.body.weight,
        age:req.body.age,
        blood_group:req.body.blood_group,
        Image_src:req.body.Image_src
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

//pending work for video call lab
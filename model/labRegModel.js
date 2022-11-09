const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const labPersonData = Schema({
    userfirst:{
        type:String,
    },
    userfathername:{
        type:String,
    },
    usersurname:{
        type:String,
    },dob:{
        type:String
    },user_number:{
        type:Number
    },
    labuserid:{
        type:String,
    },
    useremail_id:{
        type:String,
    },
    user_email_pass:{
        type:String
    },
    aadharno:{
        type:String
    },
    currentadress:{
        type:String
    },
    labname:{
        type:String
    },
    labcontactno:{
        type:String
    },coursename:{
        type:String
    },course_reg_no:{
        type:String
    },course_reg_date:{
        type:String
    },course_reg_validup:{
        type:String
    },lab_address:{
        type:String
    },labtime:{
        type:String
    },lab_profile_img:{
        type:String
    }
    ,lab_office_image:[{
       lab_img:{
          type:String
       }
    }]
    ,tokens:[{
        token:{
            type:String
        }
    }]

},{timestamps:true});

labPersonData.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this._id,
        number: this.number,
        userfirst:this.userfirst,
        userfathername:this.userfathername,
        usersurname:this.usersurname,
        dob:this.dob,
        user_number:this.user_number,
        labuserid:this.labuserid,
        useremail_id:this.useremail_id,
        user_email_pass:this.user_email_pass,
        aadharno:this.aadharno,
        currentadress:this.currentadress,
        labname:this.labname,
        labcontactno:this.labcontactno,
        coursename:this.coursename,
        course_reg_no:this.course_reg_no,
        course_reg_date:this.course_reg_date,
        course_reg_validup:this.course_reg_validup,
        lab_address:this.lab_address,
        tokens:this.token
    },process.env.JWT_SECRET_KEY)
    return token
}

module.exports.labdataSet = model('labdata',labPersonData);
const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const imageschema = Schema({reportimage:{type:String},reprotdescr:{type:String,default:""}})


const dataUpdateSchema = Schema({

    number:{
        type:String,

    },yourid:{
        type:String,
    },
    name:{
        type:String
    },
    email_id:{
        type:String
    },
    address:{
        type:String
    },
    aadhaar_no:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    age:{
        type:String
    },
    blood_group:{
        type:String
    },
    Image_src:{
        type:String
    },
    reportdocumentimages:[imageschema]

});

dataUpdateSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        number: this.number,
        yourid:this.yourid,
        name:this.name,
        email_id:this.email_id,
        address:this.address,
        aadhaar_no:this.aadhaar_no,
        height:this.height,
        weight:this.weight,
        age:this.age,
        blood_group:this.blood_group,
        Image_src:this.Image_src,

    },process.env.JWT_SECRET_KEY)

}

module.exports.updateUser = model('new_users',dataUpdateSchema);
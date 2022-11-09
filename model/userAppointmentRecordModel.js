const {Schema, model} = require('mongoose');

const SavePationData = Schema({
    userid:{
        type:String
    },
    specialization:{
        type:String
    },
    bookingDate:{
        type:String
    },
    bookingTime:{
        type:String
    },
    doctorid:{
        type:String
    },
    name:{
        type:String
    },
    doctorimage:{
        type:String
    },
    degree:{
        type:String
    },
    clinicName:{
        type:String
    },
    Address:{
        type:String
    },
    healthdiagnose:{
        type:String
    },
    prescribemedicine:{
        type:String
    },
    suggesttest:{
        type:String
    },
    status:{
       type: Boolean,
       default:true
    }
    
});


module.exports.recordUserSend = model('userappointmentrecords',SavePationData);
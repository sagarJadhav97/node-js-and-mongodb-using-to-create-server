const {Schema, model} = require('mongoose');

const doctorSaveData = Schema({
    userid:{
        type:String,
        required:true
    },
    pationname:{
        type:String,
    },
    pationimage:{
        type:String
    },
    bookingDate:{
        type:String
    },
    bookingTime:{
        type:String
    },
    doctorid:{
        type:String,
        required:true
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


module.exports.doctorrecord = model('doctorrecordstores',doctorSaveData);
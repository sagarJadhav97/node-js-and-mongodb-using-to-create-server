const {Schema, model} = require('mongoose');

const doctorSavePationData = Schema({
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

});


module.exports.doctorPationDetails = model('doctorcollections',doctorSavePationData);
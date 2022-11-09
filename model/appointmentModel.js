const {Schema, model} = require('mongoose');


const doctorDataSearch = Schema({
    name:{
        type:String
    },
    specialization:{
        type:String
    },    
    clinicName:{
        type:String
    },
    degree:{
        type:String
    },
    Address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    bookingDate:{
        type:String
    },
    bookingTime:{
        type:String
    },
    userid:{
        type:String
    },
    doctorid:{
        type:String
    },
    doctorimage:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }

});


module.exports.updateUser = model('appointmentdatas',doctorDataSearch);
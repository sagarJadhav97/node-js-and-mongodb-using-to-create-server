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
    }
});


module.exports.doctorSearch = model('locationdoctoredatas',doctorDataSearch);
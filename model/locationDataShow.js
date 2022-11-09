const {Schema, model} = require('mongoose');

const locationDataRead = Schema({
    name:{
        type:String
    },
    specialization:{
        type:String
    },
    Address:{
        type:String
    },
    clinic:{
        type:String
    },
    degree:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    }


});


module.exports.locationModuleRun = model('doctorcollection',locationDataRead);
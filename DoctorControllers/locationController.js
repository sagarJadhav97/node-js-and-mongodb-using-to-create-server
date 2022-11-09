const { locationModuleRun } = require('../model/locationDataShow');


module.exports.locationEnginSet = async (req, res) => {
    var regex = new RegExp(req.params.city,'i');
    locationModuleRun.find({city:regex}).then(result=>{
        res.status(200).json({
            data:result
        })
       
    }).catch(err=>{
        res.status(404).send("Wrong id enter")
    })
}




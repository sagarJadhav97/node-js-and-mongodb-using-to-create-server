const { doctorSearch } = require('../model/doctorSearchModel');


module.exports.careDoctorList = async (req, res) => {
     var regex = new RegExp(req.params.key,'i');

    let result = await doctorSearch.find({
        "$or":[
               {"name":regex},
               {"city":regex}
              ]
    });

    return res.status(200).send({
        data: result
    });

}




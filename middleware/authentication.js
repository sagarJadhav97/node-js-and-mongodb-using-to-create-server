const jwt = require('jsonwebtoken');
const { labdataSet } = require('../model/labRegModel');

const auth = async (req, res, next)=>{
    try{    
            const token = req.cookies.jwt;
            const verifyUser = jwt.verify(token,process.evn.seacretKey);
            console.log(verifyUser);

        	const user = await labdataSet.findOne({_id:verifyUser._id});
            console.log(user);
            next();
       }catch(error){
		    res.status(401).send(error);
		     }
}

module.exports = auth;
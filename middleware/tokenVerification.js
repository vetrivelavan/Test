const jwt = require('jsonwebtoken');
const { nextTick } = require('process');
require('dotenv').config();

token ={};
token.verify=async(req,res,next) =>{
    try{
        // validation for headers
       if(!req.headers.Token) return res.status(403).json({statusCode:400,message:"token not found"})
       // verify jwt
       const getRole = jwt.verify(req.headers.token, process.env.TOKEN);
       // check the role, this we can use acl for better expirence
       if(!getRole.role) return res.status(400).json({statusCode:400,message:"token not found"})
       if(getRole.role == 'Admin'){
           next()
       }else{
        return res.status(403).json({statusCode:403,message:"Unautorized User"});
       }
    } catch(err) {
        return res.status(500).json({statusCode:500,message:err.message});
    }
}

module.exports = token;
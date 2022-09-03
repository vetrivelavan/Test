const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const helper = require("../helpers/smsHealper")
require('dotenv').config();
const saltRounds = 10;
user ={};

user.create=async(req,res)=>{
    try{
        const data = req.body;
        if(!data.DOJ || !data.userName || !data.role) return res.status(400).json({statusCode:400,message:"invalid input"});//email format not validated
        const userCheck = await userModel.find({"UserName":data.userName});
        //check user
        if(userCheck.length) return res.status(400).json({statusCode:400,message:"email already exist"})
        const password = generator.generate({length: 10,numbers: true}); //password generator
         await userModel.create({
               UserName:data.userName,
               DOJ:data.DOJ,
               Password:bcrypt.hashSync(password, saltRounds), //password hash
               Role:data.role
              });     
         await helper.mail(data.userName,password);
              return res.status(201).json({
                statusCode: 201,
                status: "success_status",
              });
    }catch(err){
        return res.status(500).json({statusCode:500,message:err.message});
    }
}


user.list=async(req,res)=>{
    try{
        const data = req.query.userName;
        if(data== undefined){
            // get all users
            const allusers = await userModel.find();
            return res.status(201).json({
                statusCode: 201,
                status: "success_status",
                data:allusers
              });     
        }else{
            //get user based on UserName 
            const user = await userModel.find({"UserName":data});
            return res.status(201).json({
                statusCode: 201,
                status: "success_status",
                data:user
              });               
        }
    }catch(err){
        return res.status(500).json({statusCode:500,message:err.message});
    }
}

user.update = async(req,res)=>{
    try{
        //check validation for input
        if(!data.DOJ || !data.userName || !data.role) return res.status(400).json({statusCode:400,message:"invalid input"});
         //find and update based on input
        await userModel.updateOne({ userName: data.userName }, { DOJ: data.DOJ, role:data.role}).then(()=>{
            return res.status(201).json({statusCode:201,message:"updated successfully"});
        }).catch(err=>{return res.status(500).json({statusCode:500,message:err.message});});
    }catch(err){
        return res.status(500).json({statusCode:500,message:err.message});
    }
};

user.delete = async(req,res)=>{
    try{
        //check validation for input
        if(!data.userName) return res.status(400).json({statusCode:400,message:"invalid input"});
        //find and delete based on input
        await userModel.findOneAndDelete({userName: data.userName }).then(()=>{
            return res.status(201).json({statusCode:201,message:"deleted successfully"});
        }).catch(err=>{return res.status(500).json({statusCode:500,message:err.message});});
    }catch(err){
        return res.status(500).json({statusCode:500,message:err.message});
    }
};

user.login = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.password || !data.userName) return res.status(400).json({statusCode:400,message:"invalid input"});//email format not validated
        await userModel.find({"UserName":data.userName}).then((data)=>{
            // check user for login 
            if(data.length == 0)return res.status(400).json({statusCode:400,message:"user not available"})
            const match = await bcrypt.compare(data.password, data[0]?.password);
            // compre the password
            if(match){
            //create token for login
            const token = jwt.sign({ role: data[0].role,userName:data.userName}, process.env.TOKEN,{ expiresIn: process.env.TOKEN_DURATION});
                return res.status(201).json({statusCode:201,message:"logged in successfully",token:token})
            } else {
                return res.status(400).json({statusCode:400,message:"invalid user password"});
            }
        })
    }catch(err){
        return res.status(500).json({statusCode:500,message:err.message});
    }
}


module.exports = user;



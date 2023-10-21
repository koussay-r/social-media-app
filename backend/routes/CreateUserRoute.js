const express=require("express")
const dotenv=require("dotenv")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CreateUsermodel=require("./../models/CreateUserModel.js")
const postModel=require('./../models/postmodel.js')
dotenv.config()


const CreateUserRoute=express.Router()

CreateUserRoute.post("/",async(req,res)=>{
    const plainTextPassword = req.body.password;
bcrypt.hash(plainTextPassword, saltRounds, async(err, hash)=> {
    if (err) {
        console.log(err)
    } else {
        // Store 'hash' in your database
        try{
            const ress=await CreateUsermodel.create({
                name:req.body.name+" "+req.body.LastName,
                Location:req.body.Location,
                Occupation:req.body.Occupation,
                email:req.body.email,
                password:hash,
                pfp:req.body.pfp,
                likeCount:0
              });
            res.status(201).send(ress)
        }
        catch(err){
            console.log(err)
        }
        console.log(hash);
    }
});
})
CreateUserRoute.post("/exist",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.find({email:req.body.email})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
})
CreateUserRoute.post("/login",async(req,res)=>{
    const plainTextPassword = req.body.password;

bcrypt.hash(plainTextPassword, saltRounds, async(err, hash)=> {
    if (err) {
        xonsole.log(err)
    } else {
        // Store 'hash' in your database
        try{
            const ress=await CreateUsermodel.find({$and:[{email:req.body.email},{password:hash}]})
            res.status(200).send(ress)
        }catch(err){
            console.log(err)
        }
    }
});
})
CreateUserRoute.post("/CurrentUser",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.find({_id:req.body._id})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
})
CreateUserRoute.post("/updatePfp/:_id",async(req,res)=>{
    try {
        const ress=await CreateUsermodel.findOneAndUpdate({_id:req.params._id},{pfp:req.body.pfp},{new:true})
        if(!ress){
            res.send({message:false})
        }
        else{
            try {
                const response =await postModel.findOne({userId:req.params._id})
                for (let index = 0; index < response.length; index++) {
                    response[index].userPfp=req.body.pfp
                }
                response.save()
                res.status(200).send({message:true})
            } catch (error) {
                res.status(500).send(error.message)
            }
        }
    } catch (error) {
        
    }
})
module.exports=CreateUserRoute
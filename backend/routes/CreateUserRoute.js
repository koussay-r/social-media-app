const express=require("express")
const dotenv=require("dotenv")
const CreateUsermodel=require("./../models/CreateUserModel.js")
dotenv.config()


const CreateUserRoute=express.Router()

CreateUserRoute.post("/",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.create({
            name:req.body.name+" "+req.body.LastName,
            Location:req.body.Location,
            Occupation:req.body.Occupation,
            email:req.body.email,
            password:req.body.password,
            pfp:req.body.pfp,
            likeCount:0
          });
        res.status(201).send(ress)
    }
    catch(err){
        console.log(err)
    }
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
    try{
        const ress=await CreateUsermodel.find({$and:[{email:req.body.email},{password:req.body.password}]})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
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
            res.status(200).send({message:true})
        }
    } catch (error) {
        
    }
})
module.exports=CreateUserRoute
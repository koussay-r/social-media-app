const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv")
const CreateUsermodel=require("./../models/CreateUserModel.js")
dotenv.config()


const CreateUserRoute=express.Router()

CreateUserRoute.post("/",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.create(req.body);
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
module.exports=CreateUserRoute
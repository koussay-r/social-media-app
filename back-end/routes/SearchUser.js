const mongoose=require("mongoose");
const express=require("express");
const userModel=require('./../models/CreateUserModel.js')
const route=express.Router()

route.post("/serach",async(req,res)=>{
    try{
        const ress=await userModel.find({name:new RegExp(req.body.name, 'i')});
        res.status(200).send(ress)
    }
    catch(err){
        console.log(err)
    }
})

module.exports=route
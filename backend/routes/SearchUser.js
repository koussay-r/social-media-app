const express = require("express");
const mongoose=require("mongoose")
const userModel = require("./../models/CreateUserModel.js");
const route = express.Router();
const dotenv=require("dotenv")
const nodemailer = require('nodemailer');
dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'koussayrouissi72@gmail.com',
    pass: process.env.APP_PASSOWORD,
  },
});
route.post("/serach", async (req, res) => {
  try {
    const ress = await userModel.find({ name: new RegExp(req.body.name, "i") });
    res.status(200).send(ress);
  } catch (err) {
    console.log(err);
  }
});
route.put("/sendRequest", async (req, res) => {
  try {
    const freindRequests = await userModel.find({ _id: req.body.UserSentToId });
    if (!freindRequests[0].freindRequest.includes(req.body._id)) {
      freindRequests[0].freindRequest.push(req.body._id);
    }
    const ress = await userModel.findByIdAndUpdate(
      { _id: req.body.UserSentToId },
      { freindRequest: freindRequests[0].freindRequest }
    );
    res.status(200).send(ress);
  } catch (err) {
    console.log(err);
  }
});
route.put("/removeRequest", async (req, res) => {
  try {
    const freindRequests = await userModel.find({ _id: req.body.UserSentToId });
    if (freindRequests[0].freindRequest.includes(req.body.id)) {
        const indexToRemove = freindRequests[0].freindRequest.indexOf(req.body.id);
        freindRequests[0].freindRequest.splice(indexToRemove, 1);
    }
    const ress = await userModel.findByIdAndUpdate(
      { _id: req.body.UserSentToId },
      { freindRequest: freindRequests[0].freindRequest }
    );
    res.status(200).send(ress);
  } catch (err) {
    console.log(err);
  }
});
route.post("/requestsList",async(req,res)=>{
  try{
    const ress=await userModel.find({_id:req.body.id});
    const list=[]
    for(let i=0;i<ress[0].freindRequest.length;i++){
      const result=await userModel.find({_id:ress[0].freindRequest[i]})
      list.push(result)
    }
    res.status(200).send(list)
  }catch(err){
    console.log(err)
  }
})
route.post("/AcceptRequest/:id",async(req,res)=>{
  try{
    const user=await userModel.find({_id:req.params.id})
    user[0].friendsList.push(req.body);
    user[0].friendsListIds.push(req.body._id)
    const ress=await userModel.findByIdAndUpdate({_id:req.params.id},{friendsList:user[0].friendsList,friendsListIds:user[0].friendsListIds})
    res.status(200).send(ress)
  }catch(err){
    console.log(err)
  }
})
route.post("/findUserById",async(req,res)=>{
  try{
  const ress=await userModel.find({_id:req.body._id})
  res.status(200).send(ress)
  }
  catch(err){
      console.log(err)
  }
  })
  route.post("/findLostAccount",async(req,res)=>{
    const userFound={
      pfp:"",
      name:""
    }
    try {
      const ress=await userModel.find({email:req.body.email})
      if(ress.length==0){
        res.send(false)
      }
      else{
        userFound.pfp=ress[0].pfp
        userFound.name=ress[0].name
        res.status(200).send(userFound)
      }
    } catch (error) {
      console.log(error);
    }
  })
let recovery_code=0;
route.post("/resetPassword/:random_code",(req,res)=>{
  recovery_code=req.params.random_code
  console.log(recovery_code)
  const mailOptions = {
    from: 'koussayrouissi72@gmail.com',
    to: req.body.email, // User's email
    subject: 'Password Reset Code',
    text: 'Your password reset code is: ' +req.params.random_code ,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
    }else{
      res.send(recovery_code)
    }
  });
})
module.exports = route
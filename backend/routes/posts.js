const express=require("express")
const postModel=require('./../models/postmodel.js')
const userModel=require("./../models/CreateUserModel.js")
const route=express.Router()
const cloudinary = require('cloudinary').v2;
const dotenv=require("dotenv");
dotenv.config()
route.post("/create",async(req,res)=>{
  try {
    const createPost= await postModel.create(req.body)
    res.status(201).send(createPost)}
    catch(err){
      console.log(err)
    }

})
route.put("/Likes/:symbole",async(req,res)=>{
  try{
    const doc=await postModel.findById({_id:req.body._id})
    const userLikesCount=await userModel.find({_id:req.body.userId})
    if(req.params.symbole==0){
      doc.likes--;
      userLikesCount[0].likeCount--
      const indexToRemove = doc.UsersLikes.indexOf(req.body.userId);
      doc.UsersLikes.splice(indexToRemove, 1);
    }
    else{
      doc.likes++;
      userLikesCount[0].likeCount++
      doc.UsersLikes.push(req.body.userId)
    }
    await doc.save()
    const ress=await userModel.findByIdAndUpdate({_id:req.body.userId},{likeCount:userLikesCount[0].likeCount})
    res.status(200).send(doc)
    res.status(200).send(ress)
  }catch(err){
    console.log(err)
  }
})
route.post("/",async(req,res)=>{
  try{
    if(req.body.userId=="0"){
      const ress=await postModel.find()
      console.log(ress)
      res.status(200).send(ress)
    }
    else{
      const ress=await postModel.find({userId:req.body.userId})
      res.status(200).send(ress)

    }
    
  }catch(err){
    console.log(err)
  }
})
route.post("/makeComment",async(req,res)=>{
  try{
    const doc=await postModel.findById({_id:req.body._id})
    doc.comments.push({_id:req.body.userId,name:req.body.name,comment:req.body.comment,picture:req.body.picture})
    await doc.save()
    res.status(200).send(doc)
  }catch(err){
    console.log(err)
  }
})
module.exports=route
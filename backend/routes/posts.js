const express=require("express")
const postModel=require('./../models/postmodel.js')
const route=express.Router()
const cloudinary = require('cloudinary').v2;
const dotenv=require("dotenv");
dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  });
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
    if(req.params.symbole==0){
      doc.likes--;
      const indexToRemove = doc.UsersLikes.indexOf(req.body.userId);
      doc.UsersLikes.splice(indexToRemove, 1);
    }
    else{
      doc.likes++;
      doc.UsersLikes.push(req.body.userId)
    }
    await doc.save()
    res.status(200).send(doc)
  }catch(err){
    console.log(err)
  }
})
route.get("/",async(req,res)=>{
  try{
    const ress=await postModel.find()
    res.status(200).send(ress)
  }catch(err){
    coneole.log(err)
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
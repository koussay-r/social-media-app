const express=require("express")
const postModel=require('./../models/postmodel.js')
const userModel=require("./../models/CreateUserModel.js")
const pictureModel=require("./../models/postPicturesModel.js")
const Pusher = require("pusher");
const route=express.Router()
const dotenv=require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config()
const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: "eu",
  useTLS: true
});
route.post("/create",async(req,res)=>{
  try {
    const createPost= await postModel.create(req.body.post)
    if(req.body.picture!=""){
      await pictureModel.create({postId:createPost._id,picture:req.body.picture})
    }
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
      if (!doc.UsersLikes.includes(req.body.currentUser)) {
      if(req.body.userId!=req.body.currentUser){
          doc.ReactionNotifications.push(req.body.userId)
      }
        doc.likes++;
        userLikesCount[0].likeCount++
        doc.UsersLikes.push(req.body.currentUser)
      }
    }
    await doc.save()
    await userModel.findByIdAndUpdate({_id:req.body.userId},{likeCount:userLikesCount[0].likeCount})
    res.status(200).send(doc)
  }catch(err){
    console.log(err)
  }
})
route.post("/",async(req,res)=>{
  try{
    if(req.body.userId=="0"){
      const ress=await postModel.find()
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
route.post("/getPostUserpfp",async(req,res)=>{
  if(req.body.PostUserId){
    try{
      const userPfp=await userModel.findById({_id:req.body.PostUserId})
      const checkIfPostGotaPicture=await postModel.findById({_id:req.body.PostId})
      res.status(200).send({pfp:userPfp.pfp,withPicture:checkIfPostGotaPicture.withPicture})
    }catch(err){
      console.log(err.message)
    }
  }
})
route.post("/getPostUserPicture",async(req,res)=>{
  try{
    const pfp=await pictureModel.findOne({postId:req.body.PostId})
    res.status(200).send(pfp.picture)
  }catch(err){
    console.log(err.message)
  }
})
route.post("/getNotifications",async(req,res)=>{
})
module.exports=route
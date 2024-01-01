const express=require("express")
const postModel=require('./../models/postmodel.js')
const userModel=require("./../models/CreateUserModel.js")
const pictureModel=require("./../models/PicturesModel.js")
const multer = require('multer');
const sharp = require('sharp');
const route=express.Router()
const dotenv=require("dotenv");
mongoose = require("mongoose");
dotenv.config()
route.post("/createPostwithNoPic",async(req,res)=>{
  try {
    const createPost= await postModel.create(req.body)
    res.status(201).send(createPost)
  } catch (error) {
    console.log(error);
  }
})
const upload = multer({ dest: 'uploads/' });
route.post("/create",upload.single('image'),async(req,res)=>{
  try {
    const createPost= await postModel.create(JSON.parse(req.body.data))
      const resizedImage = await sharp(req.file.path)
      .resize({ width: 600 })
      .jpeg({ quality: 80 })
      .toBuffer();
      await pictureModel.create({PostOrUserId:createPost._id,picture:resizedImage,contentType:'image/jpeg'})
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
    try{
      const userPfp=await pictureModel.findOne({PostOrUserId:req.body.PostUserId})  
      if(userPfp){
        res.set('Content-Type',userPfp.contentType )
        res.status(200).send(userPfp.picture)
      }
    }catch(err){
      console.log(err.message)
    }
  
})
route.post("/getPostUserPicture",async(req,res)=>{
  try {
    const picture=await pictureModel.findOne({PostOrUserId:req.body.PostId})
    if (!picture) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.set('Content-Type', picture.contentType);
    res.send(picture.picture);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
})
route.post("/getNotifications",async(req,res)=>{
})
route.post("/deletePost",async(req,res)=>{
  try {
    await postModel.findOneAndDelete({_id:req.body._id})
    if(req.body.withPicture){
      await pictureModel.findOneAndDelete({PostOrUserId:req.body._id})
    }
    res.status(200).send({message:"The post has been deleted successfully"})
  } catch (error) {
    res.status(404).send(error.message);
  }
})
route.post("/getReactors/:id",async(req,res)=>{
  const userData={_id:"",
  name:""
}
  const usersfound=[]
  try {
      const response=await postModel.findOne({_id:req.params.id})
      let index = req.body.postReactorsFetchingCount
      while(index<response.UsersLikes.length&&index<req.body.postReactorsFetchingCount+10){
        const element = await userModel.findOne({_id:response.UsersLikes[index]})
        userData._id=element._id
        userData.name=element.userData
        usersfound.push(userData)
        index++
      }
    res.status(200).send(usersfound)
  } catch (error) {
    console.log(error.message)
    res.status(404).send({message:false})
  }
})
module.exports=route
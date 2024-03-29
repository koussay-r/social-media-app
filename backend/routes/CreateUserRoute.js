const express=require("express")
const dotenv=require("dotenv")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer=require('multer');
const sharp = require('sharp')
const upload= multer({dest:"/upload/"})
const CreateUsermodel=require("./../models/CreateUserModel.js")
const pfpModel = require("./../models/PicturesModel.js")
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
                likeCount:0
              });
            res.status(201).send(ress)
        }
        catch(err){
            console.log(err)
        }
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
    try {
        const password=await CreateUsermodel.find({email:req.body.email})
        if(password.length==0){
            res.send(password);
        }
        else{
            const storedHashedPassword = password[0].password; // Retrieve the stored hashed password from your database
            const loginPassword = req.body.password; // User's login input
            bcrypt.compare(loginPassword, storedHashedPassword, async(err, result) =>{
                if (result === true) {
                    // Passwords match
                    // Allow the user to log in
                    try{
                        const ress=await CreateUsermodel.find({email:req.body.email})
                        res.status(200).send(ress)
                    }catch(err){
                        console.log(err)
                    }
                } else {
                    // Passwords don't match
                    // Deny the login attempt
                    res.send([])
                    console.log("password don't match")
                }
            });
        }
    } catch (error) {
        console.log(error)
    }

    }

)
CreateUserRoute.post("/CurrentUser",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.find({_id:req.body._id})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
})
CreateUserRoute.post("/updatePfp/:_id",upload.single("pfp"),async(req,res)=>{
    try {
        const resizedImage = await sharp(req.file.path)
        .resize({ width: 480 })
        .jpeg({ quality: 80 })
        .toBuffer();
        const dataFound=await pfpModel.findOne({PostOrUserId:req.params._id})
        if(dataFound){
            dataFound.picture=resizedImage;
            dataFound.save()
            res.status(200).send({message:true})
        }
        else{
            await pfpModel.create({PostOrUserId:req.params._id,picture:resizedImage,contentType:'image/jpeg'})
            res.status(200).send({message:true})
            
        }
    } catch (error) {
        res.send({message:false})
        console.log(error.message)
    }
})
module.exports=CreateUserRoute
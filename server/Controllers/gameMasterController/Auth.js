import Gamemaster from '../../Models/gamemasterSchema.js'
import bcrypt, { hash } from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import imageSchema from '../../Models/imageSchema.js'

const createJwtToken = async(data)=>{
    return jwt.sign(data,'secret',{expiresIn:'7d'})
}
export const registerGamemaster = async (req,res,next)=>{
    try {
        const {email,name,password,phone} = req.body
        console.log(email,name,phone,password)
        const emailExist =  await Gamemaster.findOne({email})
        if(emailExist){
            return res.status(409).send({message:"Email already exist"})
        }
        //Hashing password
        let hashedPassword=await bcrypt.hashSync(password ,12);
        const date = new Date()
        await new Gamemaster({
            name,
            email,
            phone,
            password:hashedPassword,
            registerAt:date
        }).save().then(async(data)=>{
            const {name,email,_id,profilepic} = data
            const token = await createJwtToken({id:_id})
            res.status(200).send({message:"connected",token,user:{name,email,profilepic}})  
        }).catch((err)=>{
            res.status(400).send({message:"Internal server error"})
        })    
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal server error"})
    }
}
export const signInGamemaster = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await Gamemaster.findOne({email})
        if(!user || !await bcrypt.compare(password,user?.password)){
            return res.status(404).send({message:"invalid email or password"})
        }else{
            const {name,email,_id,profilepic} = user
            const token = await createJwtToken({id:_id})
            res.status(200).send({message:"connected",token,user:{name,email,profilepic}})  
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal server error"})
    }
}


export const uploadProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const typeOfImage = 'profile';
        const uploadedDate = new Date();
        const uploadedImage = req.body.image;
        
        if (!uploadedImage) {
            return res.status(400).send({ message: "Image not found" });
        }
        
        let existingImage = await imageSchema.findOne({ user: id, typeOfImage: 'profile' });
        if (existingImage) {
            existingImage.image = uploadedImage;
            existingImage.uploadedDate = uploadedDate;
            await existingImage.save();
            return res.status(200).send({ image: existingImage.image });
        } else {
            const newImage = new imageSchema({
                image: uploadedImage,
                typeOfImage,
                user: id,
                uploadedDate,
            });
            await newImage.save();
            await Gamemaster.findOneAndUpdate({_id:id},{$set:{
                profilepic:true
            }})
            return res.status(200).send({ image: newImage.image });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
export const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const profileImage = await imageSchema.findOne({ user: id });
        
        if (!profileImage) {
            return res.status(200).send({ message: "No image registered" });
        }
        console.warn("found")
        const base64Image = profileImage.image.toString('base64');
        res.status(200).send({ message: "get data",Image: base64Image });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
};
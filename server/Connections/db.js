import mongoose from 'mongoose'
export const dbConnection = async(Url) =>{
    mongoose.connect(Url)
    .then(()=>console.log("db connected "+Url))
    .catch((err)=>console.log(err.message))
}
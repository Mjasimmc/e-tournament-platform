import mongoose from 'mongoose'
const ImageSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    typeOfImage:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    uploadedDate:{
        type:Date,
        required:true
    }
})

export default mongoose.model('image',ImageSchema)
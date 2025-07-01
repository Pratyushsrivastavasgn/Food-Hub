const mongoose=require("mongoose")

const ImageSchema = new mongoose.Schema({
    url:String,
    filename:String
})

const FoodSchema=new mongoose.Schema({
    title:String,
    images:[ImageSchema],
    price:Number,
    description:String,
    location:String
})

module.exports=mongoose.model("Foodpost",FoodSchema)
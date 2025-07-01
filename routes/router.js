const multer  = require('multer');
const upload = multer({ dest: 'uploads/'})
const express = require("express")
const router = express.Router()
const Foodpost= require("../models/foodpost")

router.get("/",async (req,res)=>{
    const foodposts=await Foodpost.find({})
    res.render('index',{foodposts})
})
router.get("/new",async(req,res)=>{
    res.render("new")
})

router.post('/',upload.array('image'),async (req,res)=>{
    const foodpost=new Foodpost(req.body)
    foodpost.images= req.files ? req.files.map(f=>({url:f.path,filename:f.filename})) : []
    await foodpost.save()
    console.log("Foodpost Created")
    res.redirect(`/foodposts/${foodpost._id}`)
})
router.get("/:id",async(req,res)=>{
    const foodpost=await Foodpost.findById(req.params.id)
    res.render("show",{foodpost})
})
module.exports=router
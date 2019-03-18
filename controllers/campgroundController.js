const express = require('express');
const router = express.Router();
const Campgrounds = require('../models/campgrounds');



router.get('/',(req,res)=>{
    Campgrounds.find({},(err,allCampgrounds)=>{
        if(err){
            console.log(err)
        }else{
            res.render('campgrounds/campgrounds.ejs',{campgrounds:allCampgrounds});
        }
    });
    
});


router.post("/",(req,res)=>{
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const desc = req.body.description;
    const newCampground = {name: name, imgUrl: imgUrl, description:desc}
    //create a campground and save to DB
    Campgrounds.create(newCampground, (err, newCreate)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds')
        }
    })
    
});

router.get('/new',(req,res)=>{
    res.render("campgrounds/new.ejs");
});

router.get('/:id',(req,res)=>{
    //find the campground by id
    Campgrounds.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/show.ejs',{campground: foundCampground})
        }
    })  
});


module.exports = router;
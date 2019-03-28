const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');


router.get('/',(req,res)=>{
    console.log("loggedIn user===>", req.user)
    Campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log(err)
        }else{
            res.render('campgrounds/campgrounds.ejs',{campgrounds:allCampgrounds, currentUser:req.user});
        }
    });
    
});


router.post("/",isLoggedIn,(req,res)=>{
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const desc = req.body.description;
    const author = {
        id:req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, imgUrl: imgUrl, description:desc, author:author}
    //create a campground and save to DB
    Campground.create(newCampground, (err, newCreate)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds')
        }
    })
    
});

router.get('/new',isLoggedIn,(req,res)=>{
    res.render("campgrounds/new.ejs");
});

router.get('/:id',(req,res)=>{
    //find the campground by id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/show.ejs',{campground: foundCampground})
        }
    })
      
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}




module.exports = router;
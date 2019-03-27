const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const Comment = require("../models/comments");



router.get('/',(req,res)=>{
    Campground.find({},(err,allCampgrounds)=>{
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
    Campground.create(newCampground, (err, newCreate)=>{
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
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/show.ejs',{campground: foundCampground})
        }
    })
      
});


router.get('/:id/comments/new',isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err)
        }else{
            res.render('comments/new.ejs', {campground: campground})
        }
    })   
})

router.post('/:id/comments', (req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err,comment)=>{
                if(err){
                    console.log(err)
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+ campground._id)
                }
            })
        }
    })
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

module.exports = router;
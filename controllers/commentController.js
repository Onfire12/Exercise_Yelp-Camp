const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require('../models/campgrounds');
const Comment = require('../models/comments')

router.get('/new',isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err)
        }else{
            res.render('comments/new.ejs', {campground: campground})
        }
    })   
})

router.post('/', isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err,comment)=>{
                if(err){
                    console.log(err)
                }else{
                    //add user id and username to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    console.log("comment=====>",comment)
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





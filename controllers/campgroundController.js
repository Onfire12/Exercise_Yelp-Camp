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
    const price = req.body.price;
    const author = {
        id:req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, imgUrl: imgUrl, description:desc, price:price, author:author}
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

//Edit Route
router.get("/:id/edit",(req,res)=>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err,foundCampground)=>{
            if(err){
                res.redirect("/campgrounds")
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit.ejs",{campground: foundCampground})
                }else{
                    console.log("you have no permission to edit")
                }
            }
        })
    }
});

router.put("/:id", checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, updatedCampground)=>{
        if(err){
            res.send(err)
        }else{
            req.flash("success","Updated Campground Successfully")
            res.redirect("/campgrounds/"+ req.params.id)
        }
    });
})

//Delete Route
router.delete("/:id",checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id, (err,deleteCampground)=>{
        if(err){
            res.send(err)
        }else{
            req.flash("success","Delete Campground Successfully")
            res.redirect("/campgrounds")
        }
    })
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login first to do that")
    res.redirect('/login')
}

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err,foundCampground)=>{
            if(err){
                req.flash("error","Campground not found")
                res.redirect("back")
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You dont have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","You need to login to do that")
        res.redirect("back");
    }
}


module.exports = router;
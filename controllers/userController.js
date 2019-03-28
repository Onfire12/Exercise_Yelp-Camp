const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local");

//Register
router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

router.post('/register',(req,res)=>{
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect('/campgrounds')
        });
    });
});

router.get('/login',(req,res)=>{
    res.render('login.ejs', {message: req.flash("error")})
});

router.post('/login',passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req,res)=>{
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
})

module.exports = router;
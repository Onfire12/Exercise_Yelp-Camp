const express = require('express');
const router = express.Router();
const Campgrounds = require('../models/campgrounds');

var campgrounds= [
    {name:"Salmon Creek", imgUrl:"https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
    {name:"Jenny Lake Camp", imgUrl:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Wye Valley Camp", imgUrl:"https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"},
]

router.get('/',(req,res)=>{
    
    res.render('camgrounds.ejs',{campgrounds:campgrounds});
})


router.post("/",(req,res)=>{
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const newCampground = {name: name, imgUrl: imgUrl}
    campgrounds.push(newCampground);
    res.redirect("/camgrounds");
})

router.get('/new',(req,res)=>{
    res.render("new.ejs");
})




module.exports = router;
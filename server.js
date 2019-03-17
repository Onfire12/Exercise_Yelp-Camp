const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;


const session = require('express-session');
require('./db/db');

// const Camgrounds = require('./models/campgrounds');

app.use(bodyParser.urlencoded({extended: false}));

// app.set('view engine','ejs');

app.get('/', (req,res)=>{
    res.render("index.ejs");
});


app.get('/camgrounds',(req,res)=>{
    var camgrounds= [
        {name:"Salmon Creek", imgUrl:"https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
        {name:"Jenny Lake Camp", imgUrl:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name:"Wye Valley Camp", imgUrl:"https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"},
    ]
    res.render('camgrounds.ejs',{camgrounds:camgrounds});
})


app.post("/camgrounds",(req,res)=>{
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const newCampground = {name: name, imgUrl: imgUrl}
    camgrounds.push(newCampground);
    res.redirect("/camgrounds");
})

app.get('/camgprounds/new',(req,res)=>{
    res.render("new.ejs");
})





app.listen(PORT, ()=>{
    console.log("this App is listenting at : ", PORT)
});
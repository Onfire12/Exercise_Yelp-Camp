const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const LocalStrategy = require("passport-local");

const User = require('./models/user');

const campgroundController = require('./controllers/campgroundController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');


const session = require('express-session');
require('./db/db');

// const Camgrounds = require('./models/campgrounds');

app.use(bodyParser.urlencoded({extended: false}));
//passport configuation
app.use(session({
	secret:"this is a random string secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

app.use('/campgrounds',campgroundController);
app.use('/campgrounds/:id/comments',commentController);
app.use('/',userController);


// app.set('view engine','ejs');


app.get('/', (req,res)=>{
    res.render("index.ejs");
});

app.get('/campgrounds',(req,res)=>{
    res.render('camgrounds.ejs')
})


app.listen(PORT, ()=>{
    console.log("this App is listenting at : ", PORT)
});
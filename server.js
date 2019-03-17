const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const campgroundController = require('./controllers/campgroundController');



const session = require('express-session');
require('./db/db');

// const Camgrounds = require('./models/campgrounds');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret:"this is a random string secret",
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(__dirname + '/public'));

app.use('/camgrounds',campgroundController);

// app.set('view engine','ejs');


app.get('/', (req,res)=>{
    res.render("index.ejs");
});








app.listen(PORT, ()=>{
    console.log("this App is listenting at : ", PORT)
});
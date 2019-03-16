const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


require('./db/db');

const PORT = process.env.PORT || 3000;



app.get('/', (req,res)=>{
    res.render("index.ejs");
});





app.listen(PORT, ()=>{
    console.log("this App is listenting at : ", PORT)
});
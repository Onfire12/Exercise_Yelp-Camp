const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    name:String,
    imgUrl:String,
    description:String,
    price:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Campgrounds = mongoose.model('Campgrounds',campgroundSchema)

module.exports = Campgrounds;


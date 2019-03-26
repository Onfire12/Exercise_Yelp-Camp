const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    name:String,
    imgUrl:String,
    description:String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Campgrounds = mongoose.model('Campgrounds',campgroundSchema)

module.exports = Campgrounds;


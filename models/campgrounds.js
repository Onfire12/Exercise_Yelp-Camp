const mongoose = require('mongoose');

const campgroundSchema = mongoose.Schema({
    name:String,
    imgUrl:String,
    description:String
});

const Campgrounds = mongoose.model('Campgrounds',campgroundSchema)

module.exports = Campgrounds;


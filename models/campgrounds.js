const mongoose = require('mongoose');

const campgroundSchema = mongoose.Schema({
    name:String,
    imgUrl:String
});

const Campgrounds = mongoose.model('Campgrounds',campgroundSchema)

module.exports = Campgrounds;


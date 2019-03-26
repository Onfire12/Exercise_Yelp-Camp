const mongoose = require("mongoose");
const passsportLocalMongoose =  require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passsportLocalMongoose);
const User = mongoose.model("User",UserSchema);

module.exports = User;
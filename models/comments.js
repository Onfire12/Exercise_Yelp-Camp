const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    commenttext: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});

const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;

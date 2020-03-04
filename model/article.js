var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    slug : {
        type : String,
        lowercase: true,
        
    },
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    body : {
        type : String,
        required: true
    },
    favoritedBy :[{
        type :  Schema.Types.ObjectId,
        ref : "User"
       }],
    tagList : [{
        type: String,
        lowercase : true
    }],
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    comment : [{
        type : Schema.Types.ObjectId,
        ref : "Comment"
    }]
},{timestamps : true});

module.exports = mongoose.model("Article", articleSchema);
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    tag :{
        type : String
    },
    article : {
        type : Schema.Types.ObjectId,
        ref : "Article"
    }
})

module.exports = mongoose.model("Tags", tagSchema);
var Article = require("../model/article");
var User = require("../model/user");
var Comment = require("../model/comment");
let formatting = require("../modules/formatting");

module.exports.createArticle= (req,res, next)=>{
    let userData = req.body.article;
    let slug = userData.title.toLowerCase()
        .split(" ").join("-")+"-"+Date.now();
        
        userData.slug = slug;
        userData.author = req.user.userId;

    Article.create(userData,(err,articleCreated)=>{
        if(err){
            console.log(err);
            return res.status(400).json({err:"enter valid user 1"})
        }
        
        Article.findById(articleCreated.id).populate("author").exec((err,article)=>{
            if(err){
                return res.status(400).json({err:"enter valid user2"})
            }
            res.json({article});
        });
    }
    )};

module.exports.listArticle = (req, res, next)=>{
    Article.find({},(err,articles)=>{
        if(!err){
            res.json({articles});
        }
        res.status(400).json({err:"no article found"});
    })
    }

module.exports.updateArticle = (req, res, next)=>{
    req.body.article.author = req.user.userId;
    var slug = req.params.slug;
    Article.findOneAndUpdate(slug, req.body.article, {new : true}, (err, updatedArticle)=>{
        if(err){res.status(400).json({err : "error in updating article"})}
        Article.findById(updatedArticle.id).populate("author").exec((err,article)=>{
            if(err){
                return res.status(400).json({err:"enter valid user2"})
            }
            res.json({article});
        });
    } )
}

module.exports.deleteArticle = (req, res, next)=>{
    let slug = req.params.slug;
    Article.findOneAndDelete(slug,(err, deletedArticle)=>{
        if(err){
            return res.status(400).json({err:"Article can not be deleted"});
        }
        res.json(deletedArticle.title + "article deleted successfully");
    })
}

module.exports.addComment = async (req, res, next)=>{
    req.body.comment.author = req.user.userId;
    try {
        let articleName = req.params.slug;
        if(!await Article.findOne({slug : articleName})) {
            return res.json("no article found");
        }
        let addedComment = await Comment.create(req.body.comment)
        .populate("author").execPoulate();
        let updatedArticle = await Article.findOneAndUpdate({
            slug : articleName      
        }, {
            $addToSet : {
                comment : addedComment.id
            }
        }, { new : true});
        res.json (formatting.Comment([addedComment], req.user.userId));
    }
    catch (error) {
        next(error);
    }
}

// module.exports.addComment = (req, res, next)=>{
//     let slug = req.params.slug;
//     req.body.comment.author = req.user.userId;
//     Comment.create(req.body.comment,(err, commentAdded)=>{
//         if(err){res.status(400).json({err : "error in adding comment "})}
//         Comment.findById(commentAdded.id).populate("author").exec((err,article)=>{
//             if(err){
//                 return res.status(400).json({err:"enter valid user2"})
//             }
//             Comment.findOneAndUpdate(
//                 {slug : req.params.slug},{
//                     $addToSet : { comment : commentAdded.id}
//             })
//             res.json(formatting.Comment([commentAdded],req.user.userId));
//         });
//     })
// }
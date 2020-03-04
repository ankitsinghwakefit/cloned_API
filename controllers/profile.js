var User = require("../model/user");
var auth = require("../modules/auth");
var formatting = require("../modules/formatting");

module.exports.follow = async(req,res,next)=>{
   try {
       let followUserName = req.params.username;
       let followUser = await User.findOneAndUpdate(
           {username : followUserName}, { $addToSet : {follower : req.user.userId}}
       )
       let currentProfile = await User.findByIdAndUpdate( req.user.userId, {$addToSet : {following : followUser.id}})
       let followUserCurrentData = await User.findById(followUser.id);
       res.json({profile : formatting.profile(followUserCurrentData, currentProfile.id)});
   } catch (error) {
       next(error);
   }
}

module.exports.unFollow = async(req, res, next)=>{
    try {
       let followUserName = req.params.username;
       let followUser = await User.findOneAndUpdate(
           {username : followUserName}, { $pull : {follower : req.user.userId}}
       )
       let currentProfile = await User.findByIdAndUpdate( req.user.userId, {$pull : {following : followUser.id}})
       let followUserCurrentData = await User.findById(followUser.id);
       res.json({profile : formatting.profile(followUserCurrentData, currentProfile.id)});
    } catch (error) {
        next(error);
    }
}
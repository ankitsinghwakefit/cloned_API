var User = require("../model/user");
var auth = require("../modules/auth");

module.exports.register = (req,res,next)=>{
    User.create(req.body,(err,user)=>{
        if(err){console.log("err while creating user"+ err)}
        var token = auth.generateJWT(user);
        var userinfo = {
            email : user.email,
            token : token,
            username : user.username,
            bio : user.bio,
            image : user.image
        }
        res.json({userinfo});
      })
}

module.exports.login = (req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;
    if(!email  || !password){
        return res.status(400).json({error : "email / password required"});
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return res.status(400).json({error : "Invalid User"})
        }

        if(!user){return res.status(400).json({err : "no user found"})};

        if(!user.verifyPassword(password)){
            return res.status(400).json({err :"enter valid password"});
        }
        var token1 = auth.generateJWT(user);
        var updatedUser = {
            email : user.email,
            token : token1,
            username : user.username,
            bio : user.bio,
            image : user.image
        }
        res.json({updatedUser});
    });
}

module.exports.currentUser = (req,res,next)=>{
    User.findById(req.user.userId,(err,user)=>{
        let userinfo = {
            email : user.email,
            username : user.username,
            bio : user.bio,
            token : req.user.token
        }
        //console.log(req.headers["authorization"]);
        res.json(userinfo);
    })
}

module.exports.updateCurrentUser = (req,res,next)=>{
    let userID = req.user.userId;
    User.findByIdAndUpdate(userID,req.body,{new:true},(err,updatedUser)=>{
        if(err){return res.status(400).json({err:"enter valid user"})}
        res.json({updatedUser});
    })
}
var express = require('express');
var router = express.Router();
var controllers = require("../controllers/user");
var auth = require("../modules/auth");
var profile = require("./profile");
var User = require("../model/user");

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'API' });
});

router.post("/user",auth.validateJWT,controllers.currentUser);

router.get("/profiles/:username",(req,res)=>{
  let username = req.params.username;
  User.findOne({username},(err,profile)=>{
    if(err){res.sendStatus(400).json({err})}
    res.json({profile});
  })
});

router.put("/user", auth.validateJWT, controllers.updateCurrentUser);

module.exports = router;

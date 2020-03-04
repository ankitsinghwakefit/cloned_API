var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");
var controllers = require("../controllers/profile");
var User = require("../model/user");

router.post("/:username/follow",auth.validateJWT, controllers.follow);
router.delete("/:username/follow",auth.validateJWT, controllers.unFollow);

module.exports = router;

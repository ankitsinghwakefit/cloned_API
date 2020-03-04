var express = require('express');
var router = express.Router();
var User = require("../model/user");
var controller = require("../controllers/user");

/* GET users listing. */
router.post('/', controller.register);
router.post("/login", controller.login);

module.exports = router;

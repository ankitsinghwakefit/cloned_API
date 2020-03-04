var express = require('express');
var router = express.Router();
var auth = require("../modules/auth");
var controllers = require("../controllers/articleControl")

router.post("/", auth.validateJWT, controllers.createArticle);
router.get("/",auth.middlewareJWT, controllers.listArticle);
router.put("/:slug", auth.validateJWT, controllers.updateArticle);
router.delete("/:slug", auth.validateJWT, controllers.deleteArticle);

router.post("/:slug/comments", auth.validateJWT, controllers.addComment);


module.exports = router;
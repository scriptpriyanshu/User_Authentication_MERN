const express = require("express");
const controllers = require("../controllers/controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(controllers.Home);
router.route("/register").post(controllers.Register);
router.route("/login").post(controllers.Login);
router.route("/user").get(authMiddleware, controllers.UserController);
router.route("/logout").get(controllers.Logout);

module.exports = router;

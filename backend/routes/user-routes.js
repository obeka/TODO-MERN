const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken")

const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), userController.google);

module.exports = router;

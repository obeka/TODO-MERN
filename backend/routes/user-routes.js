const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  userController.google
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/redirect",
  passport.authenticate("github"),
  userController.github
);

module.exports = router;

const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const KakaoStrategy = require("passport-kakao").Strategy;
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const { db } = require("../models/index");


router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;


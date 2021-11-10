const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const auth = require('../middlewares/auth');
const { db } = require("../models/index");

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL:'/auth/kakao/callback' ,     // 웹에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
      
}))

router.get('/kakao',passport.authenticate('kakao'));


router.get('/kakao/callback' ,passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('/auth');
});



module.exports = router;
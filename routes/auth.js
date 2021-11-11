const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const KakaoStrategy = require("passport-kakao").Strategy;
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const { db } = require("../models/index");


passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: "5bb507c43c585a17c504e67bb77cd984",
      callbackURL: "/auth/kakao/callback", // 위에서 설정한 Redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile);
      console.log(accessToken);
      console.log(profile);
      const userEmail = profile["_json"].kakao_account.email;
      const userNickname = profile.username;
      const provider = profile.provider;
      const userGender = profile["_json"].kakao_account.gender;

      //카카오 유저에 defalt 값으로 age, userImage , location 적어놓고 새로운 api를 통해서 수정
      console.log(userEmail,userNickname, provider,userImage,userGender);
      
      
    //   if (!user)

    //   const [userEmail, userNickname, provider, userImage]  = req.body;
    //   const userParams = [
    //       userEmail,
    //       userNickname,
    //       provider,
    //       userImage,];
    //   const post = `INSERT INTO kakao (userEmail, provider , userNickname, userGender, userImage) VALUES (?, ?, ? , ?, ?);`;
    //   await db.query(post, userParams, (error, results, fields) => {
    //     if (error) {
    //       res.status(401).send(error);
    //       console.log(error);
    //     } else {
    //       console.log("누군가가 카카오회원가입을 했습니다.");
    //       res.send({ results: "완료" });
    //     }
    //   });
    }
  )
);

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
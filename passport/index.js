const passport = require("passport");
const kakao = require("./kakao");
const { db } = require("../models/index");

module.exports = () => {
  passport.serializeUser(function (user, done) {
    console.log("serializeUser ", user);
    done(null, user.userId);
  });

  passport.deserializeUser(async function (id, done) {
    console.log("deserializeUser id ", id);
    var userinfo = await user.findOne({
      where: { userId: id },
    });
    done(null, userinfo);
  });
  //실행을 한번 시켜줘야 등록이 될 것이다.
  kakao();
};

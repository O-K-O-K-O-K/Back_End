const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { db } = require("../models/index");

module.exports = () => {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_PASSPORT_KEY,
        callbackURL: "http://localhost:3000/auth/kakao/callback", // 위에서 설정한 Redirect URI
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile["_json"].kakao_account.email;
        const nickname = profile.displayName;
        const provider = "kakao";
        let userInfo;
        userInfo = await user.findOne({ where: { provider, email } });
        if (!userInfo) {
          await user.create({
            provider,
            email,
            nickname,
          });
          userInfo = await user.findOne({ where: { provider, email } });
        }
        return done(null, userInfo);
      }
    )
  );
};
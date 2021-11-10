const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");


module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: '5bb507c43c585a17c504e67bb77cd984',
    callbackURL:'/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao accessToken', profile);
    console.log('kakao refreshToken', profile);
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
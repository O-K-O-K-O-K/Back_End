// const passport = require("passport");
// const KakaoStrategy = require("passport-kakao").Strategy;
// const { db } = require("../models/index");

// module.exports = () => {
//   passport.use(
//     "kakao",
//     new KakaoStrategy(
//       {
//         clientID: process.env.KAKAO_PASSPORT_KEY,
//         callbackURL: process.env.KAKAO_URI,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         const email = profile["_json"].kakao_account.email;
//         const nickname = profile.displayName;
//         const provider = "kakao";
//         let userInfo;
//         userInfo = await user.findOne({ where: { provider, email } });  // ORM
//         if (!userInfo) {
//           await user.create({
//             provider,
//             email,
//             nickname,
//           });
//           userInfo = await user.findOne({ where: { provider, email } }); //ORM
//         }
//         return done(null, userInfo);
//       }
//     )
//   );
// };


// const passport = require('passport');

// const kakao = require('./kakaoStrategy');
// const User = require('../models/user');

// module.exports = () => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     ConfigurationOptions
//     User.findOne({ where: { id } })
//       .then(user => done(null, user))
//       .catch(err => done(err));
//   });

//   local();
//   kakao();
// };

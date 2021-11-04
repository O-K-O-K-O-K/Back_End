// const jwt = require('jsonwebtoken');
// const { db } = require("../models/index");
// require('dotenv').config();

// const isAth = async (req, res, next) => {
//   console.log(req.headers.authorization);
//   const { authorization } = req.headers;
//   const [Bearer, token] = authorization.split(' ');
//   console.log(token)
//   if (token == 'undefined') {
//     return res
//     .status(401)
//     .json({ success: false, msg: '로그인이 필요합니다.' });
//   }

//   jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
//     // 해독하면서 에러가 발생한 경우
//     // 유효기간이 끝났을 때 여기로
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, msg: '로그인 기간이 만료되었습니다.'});
//     }
//     const user_email = decoded.user_email;
//     const user_nickname =decoded.user_nickname;
//     const info = await user_info(user_email,user_nickname);

//     if (!info.success) {
//       return res
//       .status(401)
//       .json({ success: false, msg: '존재하지 않는 회원입니다.' });
//     }
//     req.user = info.rows; //수정해야함 
//     next();
//   })
// }

// const decoded = jwt.verify(token, process.env.SECRET_KEY);

// //토큰이 있는 여부만 파악, 토큰이 있는 경우, user 정보를 받기 위한 미들웨어 
// const Checkthesuer = async (req, res, next) => {
//   const authHeather = req.get('Authorization');
//   if (!(authHeather && authHeather.startsWith('Bearer'))) {
//     //로그인 안했을 경우 들어와 짐
//     return next();
//   }
// const token = authHeather.split(' ')[1];

// jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
//   // 해독하면서 에러가 발생한 경우
//   // 유효기간이 끝났을 때 여기로
//   if (error) {
//     return next();
//   }

//   // 존재하지 않는 회원인 경우
//   const data = await getUserInfo(userEmail, userNickname);

//   if (!data.success) {
//     return next();
//   }
//   req.user = data.rows;
//   next();
// });
// };

// function user_info(user_email, user_nickname) {
//   return new Promise((reslove, reject) => {
//     const query = 'select * from user where user_email = ? and user_nickname = ?';
//     const params = [user_email, user_nickname];
//     db.query(query,params, (error,rows,fields) => {
//       if(error) {
//         console.log(`유저 정보를 가져오는 DB에서 에러 발생: ${error}`);
//         return reslove({
//           success:false,
//         })
//       }
//       if (rows.length ==0) {
//         return resolve({ success: false });
//       }
//       return resolve({
//         success: true,
//         rows: rows[0],
//     })
//   })
// })
// }
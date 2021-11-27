// const passport = require('passport');
// const KakaoStrategy = require('passport-kakao').Strategy;

// const dotenv = require("dotenv");
// dotenv.config();
// const { db } = require("../models/index");



// passport.use(
//   "kakao",
//   new KakaoStrategy(
//     {
//       clientID: "5bb507c43c585a17c504e67bb77cd984",
//       callbackURL: "/auth/kakao/callback", // 위에서 설정한 Redirect URI
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       //console.log(profile);
//       console.log(accessToken);
//       console.log(refreshToken);
//       console.log(profile);
//       const userEmail = profile["_json"].kakao_account.email;
//       const userNickname = profile.username;
//       // const = profile.
//       const userGender = profile["_json"].kakao_account.gender;

//       //default 값
//       const password = "2312312"
//       const userAge = "20대"
//       const userImage = "https://doggy-project-bucket.s3.ap-northeast-2.amazonaws.com/4a3dddfd9c7458c1c824bf5e6f7d1528"
//       const userLocation = "서울시 성동구 서울숲"

//       //카카오 유저에 defalt 값으로 age, userImage , location 적어놓고 새로운 api를 통해서 수정
//       console.log(userEmail, password,userNickname, userImage,userGender, userAge, userImage, userLocation);
      

//       //const { userEmail, userNickname,  userGender } = req.body;
//       const userParams = [
//         userEmail, 
//         password,
//         userNickname, 
//         userGender,
//         userImage, 
//         userAge, 
//         userLocation
//         ];
//       const post = `INSERT INTO user (userEmail,password, userNickname, userGender, userImage, userAge, userLocation) VALUES (?,?,?,?,?,?,?)`;

//       await db.query(post, (error, results, fields) => {
//         if (error) {
//           console.log

//         } else {
//           console.log("누군가가 카카오회원가입을 했습니다.");
//           return res.status(200).json({
//             success: true,
//           });
//         }
//       });
//     }
//   )
// );
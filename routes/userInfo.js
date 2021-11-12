const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../S3/s3");
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");
const _ = require("lodash");  //lodash library


///////// 나중에 user.js router로 합쳐야 함//////////////////////
////////강아지 등록 여부, 내 정보 조회, 내 정보 수정/////////////

// 강아지 등록 여부
router.get("/dogExist", auth, async (req, res) => {
  const userId = res.locals.user.userId;

  const dog = `SELECT * FROM dog WHERE dog.userId ="${userId}"`;
  const results = await db.query(dog);
  console.log("results:", results);

  if (results.length) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// 내 정보 조회하기
router.get("/me", auth, async (req, res) => {
  try {
    const userId = res.locals.user.userId;

    const userQuery = `select user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation from user where user.userId= "${userId}"`;
    await db.query(userQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
});

// 내 정보 수정하기 version 1
// router.patch("/me", upload.single("userImage"), auth, async (req, res) => {

//   try {
//     const userId = res.locals.user.userId;
//     console.log("req.body:", req.body);
//     const { userNickname, userGender, userAge, userLocation} = req.body;

//     const userImage = req.file.location;
//     const obj = JSON.parse(JSON.stringify(req.body));
//     console.log("obj: ", obj)
//     // console.log("이미지 타입:",typeof(userImage));

//     const escapeQuery = {
//       userNickname: userNickname,
//       userGender: userGender,
//       userAge: userAge,
//       userLocation: userLocation,
//       userImage: userImage,
//     };

//     console.log("여기: ", escapeQuery);

//     const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

//     await db.query(userQuery, escapeQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         msg: "user 정보 수정 성공!",
//         user,
//       });
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       msg: "로그인 하세요"
//     });
//   }
// });

//내 정보 수정하기 version 2
// router.patch("/me", upload.single("userImage"), auth, async (req, res) => {
//   try {
//     const userId = res.locals.user.userId;

//     let { userNickname, userGender, userAge, userImage, userLocation } = req.body;


//     console.log("userImage: ", userImage); //userImage가 없으면, undefined로 뜬다.
//     console.log("이미지 타입:", typeof userImage);

//     if (userImage = " ") {

//       let i;
//       const userDb = `SELECT user.userImage FROM user WHERE user.userId= "${userId}"`;
//       const thisIsImage = await db.query(userDb);
//       i = thisIsImage[0].userImage;
  
//       console.log("이게 이미지다", i);
  
//       // const obj = JSON.parse(JSON.stringify(i));
//       const obj = Object.values(JSON.parse(JSON.stringify(i)));
//       console.log("obj: ", obj)
  
//       //user의 이미지를 가져온다.
//       // let i;
//       // const userDb = `SELECT user.userImage FROM user WHERE user.userId= "${userId}"`;
//       // const thisIsImage = await db.query(userDb);
//       // i = thisIsImage[0];

//       // console.log("이게 이미지다", i);

//       const escapeQuery = {
//         userNickname: userNickname,
//         userGender: userGender,
//         userAge: userAge,
//         userImage: i,
//         userLocation: userLocation
//       };
//       console.log("이미지 타입:", typeof userImage);

//       console.log("여기: ", escapeQuery);

//       const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

//       await db.query(userQuery, escapeQuery, async (err, user) => {
//         if (err) {
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         return res.status(200).json({
//           success: true,
//           msg: "user 정보 수정 성공!",
//           user,
//         });
//       });

//     } else {

//       userImage = req.file.location;
//       console.log("else문의 userImage:", userImage)

//       const escapeQuery = {
//         userNickname: userNickname,
//         userGender: userGender,
//         userAge: userAge,
//         userImage: userImage,
//         userLocation: userLocation
//       };
//       console.log("이미지 타입:", typeof userImage);

//       console.log("여기: ", escapeQuery);

//       const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

//       await db.query(userQuery, escapeQuery, async (err, user) => {
//         if (err) {
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         return res.status(200).json({
//           success: true,
//           msg: "user 정보 수정 성공!",
//           user,
//         });
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//     });
//   }
// });


// 내 정보 수정하기, version3, using Lodash_pickBy() Method
router.patch("/me", upload.single("userImage"), auth, async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    console.log("req.body:", req.body);
    const { userNickname, userGender, userAge, userLocation } = req.body;

    // const userImage = req.file.location;
    // console.log("userImage: ",userImage)

    const obj = {
      userImage: req.file.location
    }

    console.log("여기:", _.pickBy(obj))

    const escapeQuery = {
      userNickname: userNickname,
      userGender: userGender,
      userAge: userAge,
      userLocation: userLocation,
      userImage: obj,
    };

    console.log("여기: ", escapeQuery);

    const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

    await db.query(userQuery, escapeQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        msg: "user 정보 수정 성공!",
        user,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "로그인 하세요"
    });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../S3/s3");
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");
const _ = require("lodash");  //lodash library


///////// 나중에 user.js router로 합쳐야 함/////////////////////
////////강아지 등록 여부, 내 정보 조회, 내 정보 수정////////////

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

//user 사진 수정하기
router.patch('/changeImage', upload.single("userImage"), auth, async (req, res) => {
  const userId = res.locals.user.userId;

  const userImage = req.file.location;

  console.log("userImage", userImage)

  const escapeQuery = {
    userImage : userImage
  }

  console.log("escapeQuery", escapeQuery)

  const userQuery = `UPDATE user SET userImage = "${userImage}" WHERE user.userId = "${userId}"`

  console.log("query ", userQuery)

  await db.query(userQuery, escapeQuery, async(err, user)=> {
    if(err){
      return res.status(400).json({
        msg: "유저 사진 변경 실패"
      })
    }
    return res.status(200).json({
      msg: "유저 사진 변경 성공",
      user
    })
  })

})


// 내 정보 수정하기 version 1- without userImage
router.patch("/me", auth, async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    console.log("userId" , userId)
    console.log("req.body:", req.body);
    const { userNickname, userGender, userAge, userLocation} = req.body;

    // const userImage = req.file.location;

    //json으로 parse를 해서 보내줌..!
    //const obj = JSON.parse(JSON.stringify(req.body));
    //console.log("obj: ", obj)

    // console.log("이미지 타입:",typeof(userImage));

    const escapeQuery = {
      userNickname: userNickname,
      userGender: userGender,
      userAge: userAge,
      userLocation: userLocation,
      // userImage: userImage,
    };

    console.log("여기: ", escapeQuery);

    const userQuery = `UPDATE user 
    SET userNickname="${userNickname}", userGender="${userGender}", userAge="${userAge}", userLocation="${userLocation}"
    WHERE user.userId = '${userId}'`;

    await db.query(userQuery, escapeQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        msg: "user 정보 수정 성공! 사진 제외",
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


// 내 정보 수정하기 version 4
// router.patch("/me", upload.single("userImage"), auth, async (req, res) => {

//   try {
//     const userId = res.locals.user.userId;

//     const { userNickname, userGender, userAge, userLocation} = req.body;
//     const userImage = req.file.location;

//     //좋아요 생성 전
//     if (!userImage) {

//       let existImage;
//       const isImage = `SELECT user.userImage FROM user WHERE user.userId= "${userId}"`;
//       console.log(isImage);
  
//       const results = await db.query(isImage);
//       console.log("r", results);
  
//       existImage = results[0];
//       console.log("like 존재함?", existImage);
      
//       const params = [dogPostId, userId];
//       const query = `INSERT INTO likes (dogPostId, userId) VALUES(?, ?)`;

//       await db.query(query, params, (error, rows) => {
//         if (error) {
//           console.log(error);
//           return res.status(400).json({
//             success:false
//           });
//         }
//         return res.status(200).send({
//           existLike: true,
//           message: "좋아요를 눌렀습니다.",
//         });
//       });
//     } else {
//       // user가 좋아요를 이미 누른 상태에서 한번 더 눌렀을 경우
//       return res.status(400).send({
//         message: "좋아요를 이미 누르셨습니다.",
//       });
//     }
//   } catch (err) {
//     return res.status(500).send({
//       message: "좋아요 기능이 안됩니다. 관리자에게 문의하세요",
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
// router.patch("/me", upload.single("userImage"), auth, async (req, res) => {
//   try {
//     const userId = res.locals.user.userId;
//     console.log("req.body:", req.body);
//     const { userNickname, userGender, userAge, userLocation } = req.body;

//     // const userImage = req.file.location;
//     // console.log("userImage: ",userImage)

//     const obj = {
//       userImage: req.file.location
//     }

//     console.log("여기:", _.pickBy(obj))

//     const escapeQuery = {
//       userNickname: userNickname,
//       userGender: userGender,
//       userAge: userAge,
//       userLocation: userLocation,
//       userImage: obj,
//     };

//     console.log("여기: ", escapeQuery);

//     const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

//     await db.query(userQuery, escapeQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           msg: "user 정보 수정 실패",
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


module.exports = router;
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

  const userImage = req.file.transforms[0].location;

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
    const { userNickname, userGender, userAge, userLocation} = req.body;

    const escapeQuery = {
      userNickname: userNickname,
      userGender: userGender,
      userAge: userAge,
      userLocation: userLocation,
    };

    const userQuery = `UPDATE user 
    SET userNickname="${userNickname}", userGender="${userGender}", userAge="${userAge}", 
    userLocation="${userLocation}"
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

module.exports = router;
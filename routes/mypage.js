const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../S3/s3");
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");

// 내 정보 조회하기
router.get("/me", auth, async (req, res) => {
  try {
    const user_id =  res.locals.user.user_id;

    const userQuery = `select user.user_nickname, user.user_gender, user.user_age, user.user_image from user where user.user_id= "${user_id}"`;
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

// 내 정보 수정하기
router.patch("/me", upload.single("user_image"), auth, async (req, res) => {
  try {
    const user_id =  res.locals.user.user_id;

    console.log("req.body:", req.body)
    const {
        user_nickname,
        user_gender,
        user_age,
    } = req.body;

    const user_image = req.file.location;

    const escapeQuery = {
        user_nickname: user_nickname,
        user_gender : user_gender,
        user_age : user_age,
        user_image : user_image,
    }

    console.log("여기: ",escapeQuery);

    const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;

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
    res.status(400).json({
      success: false,
    });
  }
});


//내가 쓴 글 조회하기 (마이페이지에서) 황유정
// router.get('/mypage', function (req, res, next) {
//   try {
//     const user_id =  res.locals.user.user_id;

//     const userQuery = `select user.user_nickname, user.user_gender, user.user_age, user.user_image from user where user.user_id="${user_id}";`;
//     await db.query(userQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         user,
//       });
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//     });
//   }
// });

module.exports = router;
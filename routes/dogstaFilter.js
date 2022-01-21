const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");
const ctrl2 = require("../controllers/dogstaFilter/dogstaFilter.ctrl");

//메인페이지_최신순 10개만
router.get("/mainFilter", ctrl2.getMainFilter);
// 개스타그램 메인 조회하기_추천순 페이지네이션
router.get("/likeFilter", ctrl2.getLikeFilter);
// 개스타그램 메인 조회하기_최신순 페이지네이션
router.get("/recentFilter", ctrl2.getRecentFilter);

// // 안 산뜻하게 보내려면 -> rows[0]
// // 개스타그램 메인 조회하기_추천순
// router.get("/test/likeFilter", async (req, res) => {
//   try {
//     const likeQuery = `SELECT *,
//     (SELECT COUNT(likes.dogPostId) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
//       FROM dogSta 
//       JOIN user
//       ON dogSta.userId = user.userId
//       LEFT JOIN dog
//       ON  dog.userId = user.userId
//       ORDER BY count DESC`;

//     await db.query(likeQuery, (error, rows) => {
//       if (error) {
//         return res.status(400).json({
//           success: false,
//           msg: "메인 조회하기 실패",
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         posts: rows,
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       msg: "로그인 하세용",
//     });
//   }
// });

// 개스타그램 메인 조회하기_최신순
router.get("/allFilter", async (req, res) => {
  const query = `SELECT *,
    (SELECT COUNT(likes.dogPostId) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
     FROM dogSta 
     JOIN user
     ON dogSta.userId = user.userId
     LEFT JOIN dog
     ON dog.userId = user.userId
     ORDER BY dogSta.createdAt DESC`;

  console.log("query", query);

  await db.query(query, (error, rows) => {
    if (error) {
      return res.status(400).json({
        success: false,
        msg: "메인 조회하기 실패",
      });
    }
    return res.status(200).json({
      success: true,
      posts: rows,
    });
  });
});

module.exports = router;

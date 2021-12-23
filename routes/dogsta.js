<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const dotenv = require('dotenv')
dotenv.config()
const upload = require('../S3/s3')
const ctrl = require('../controllers/dogsta/dogsta.ctrl')
const ctrl2 = require('../controllers/dogsta/dogstaFilter.ctrl')
=======
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const ctrl = require("../controllers/dogsta/dogsta.ctrl");
const ctrl2 = require("../controllers/dogsta/dogstaFilter.ctrl");
>>>>>>> 37868d6110b3ecf6ede9343d8d37e07e89cd023f

// 개스타그램 글 등록하기
router.post('/write', upload.single('dogPostImage'), auth, ctrl.addDogsta)
// 개스타그램 조회하기 -> 마이페이지 누르면 보이는 화면
router.get('/:userId', ctrl.getDogsta)
// 개스타그램 상세 조회하기
router.get('/:userId/:dogPostId', ctrl.getDetailDogsta)
// 개스타그램 사진 수정하기
router.patch(
    '/changeImage/:dogPostId',
    upload.single('dogPostImage'),
    auth,
    ctrl.updateDogstaPic
)
// 개스타그램 정보 수정하기
router.patch('/:dogPostId', auth, ctrl.updateDogstaInfo)
// 개스타그램 글 삭제하기
router.delete('/:dogPostId', auth, ctrl.deleteDogsta)

// 개스타그램 메인 조회하기_추천순 페이지네이션
router.get('/test/likeFilter', ctrl2.getLikeFilter)
// 개스타그램 메인 조회하기_최신순 페이지네이션
router.get('/test/recentFilter', ctrl2.getRecentFilter)
//메인페이지_최신순 10개만
router.get('/mainFilter', ctrl2.getMainFilter)

module.exports = router

<<<<<<< HEAD
// // 안 산뜻하게 보내려면 -> rows[0]
// // 개스타그램 메인 조회하기_추천순
// router.get("/likeFilter", async (req, res) => {
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

// // 개스타그램 메인 조회하기_최신순
// router.get("/recentFilter", async (req, res) => {
//   const query = `SELECT *,
//     (SELECT COUNT(likes.dogPostId) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
//      FROM dogSta
//      JOIN user
//      ON dogSta.userId = user.userId
//      LEFT JOIN dog
//      ON dog.userId = user.userId
//      ORDER BY dogSta.createdAt DESC`;

//   console.log("query", query);

//   await db.query(query, (error, rows) => {
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         msg: "메인 조회하기 실패",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       posts: rows,
//     });
//   });
// });
=======

>>>>>>> 37868d6110b3ecf6ede9343d8d37e07e89cd023f

// const express = require("express");
// const router = express.Router();

// // const db_config = require("../models/index");
// // const db = db_config.init();
// // db_config.connect(db);

// // const auth = require('../middlewares/auth');
// const dotenv = require("dotenv");
// dotenv.config();
// const upload = require("../S3/s3");

// const { db } = require("../models/index");

// // 유저페이지 불러오기
// router.get('/:userNickname', async (req, res) => {
//     try {
//       let userNickname = req.params.userNickname;
//       userNickname = userNickname.split('@')[1];
//       const postQuery = `select postId, postImage, postTitle, postIntro, postTime, (select count(*) from comment where postId=post.postId) as commentCnt from post where userNickname="${userNickname}";`;
//       await db.query(postQuery, async (err, posts) => {
//         if (err) {
//           logger.error(' 유저 페이지 postQuery문 실행 중 발생한 에러: ', err);
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         try {
//           const userQuery = `select user.userId, user.userEmail, user.userNickname, profile.userImage, profile.userIntro from user inner join profile on user.userId = profile.userId where user.userNickname="${userNickname}";`;
//           await db.query(userQuery, async (err, user) => {
//             if (err) {
//               logger.error('유저 페이지  userQuery문 실행 중 발생한 에러: ', err);
//               return res.status(400).json({
//                 success: false,
//               });
//             }
//             logger.info(
//               `${userNickname}님의 유저페이지를 불러오는데 성공했습니다.`
//             );
//             return res.status(200).json({
//               success: true,
//               posts,
//               user,
//             });
//           });
//         } catch (err) {
//           logger.error('유저 페이지 userQuery문 실행 중 발생한 에러:', err);
//           return res.status(400).json({
//             success: false,
//           });
//         }
//       });
//     } catch (err) {
//       res.status(400).json({
//         success: false,
//       });
//     }
//   });
// 선희님! 하시죠! 
// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth'); 
// const { db } = require('../models/index');

// router.post('/write', async (req, res) => {
//     try {
//       const { postTitle, postIntro, postContent, postImage } = req.body;
//       const userNickname = req.user.userNickname;
//       const newDate = new Date();
//       const postTime = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//       const params = [
//         postTitle,
//         userNickname,
//         postIntro,
//         postContent,
//         postImage,
//         postTime,
//       ]; //코드가 길어지는 걸 간결하게 하기 위해서!
//       const query =
//         'INSERT INTO post(postTitle, userNickname, postIntro, postContent, postImage, postTime) VALUES(?,?,?,?,?,?)';
//       await db.query(query, params, (error, rows, fields) => {
//         if (error) {
//           logger.error(`Msg: raise Error in createPost => ${error}`);
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         logger.info(`${postTitle}로 게시글 등록이 완료되었습니다.`);
//         return res.status(201).json({
//           success: true,
//         });
//       });
//     } catch (err) {
//       logger.error('게시글 작성 중 발생한 에러: ', err);
//       return res.status(500).json({
//         success: false,
//       });
//     }
//   });


module.exports = router;
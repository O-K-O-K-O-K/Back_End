// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth');
// const { db } = require("../models/index");

// //리뷰 띄우기 //모달로 뛰우는거 get 인가?
// router.post('/:postId', auth, async (req, res) => {
//     const {postId} =req.params;
//     //
//     const userId = res.locals.user.userId;
//     try {
//       const {meetingDate,wishDesc,locationCategory, dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName} = req.body;
//       console.log(meetingDate)
//       const params= [
//         meetingDate,
//         wishDesc,
//         completed,
//         locationCategory,
//         dogCount,
//         totalTime,
//         startLocationAddress,
//         endLocationAddress,
//         totalDistance,
//         routeColor,
//         routeName,
//         userId,
//       ];
//       const query =
//       'INSERT INTO post (meetingDate,wishDesc,completed,locationCategory,dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName, userId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
//         await db.query(query, params, (error, rows, fields) => {
//           console.log("row는",rows)
//           if (error) {
//             console.log(error)
//             // logger.error('게시글 저장 중 DB관련 에러가 발생 했습니다', error);
//             return res.status(400).json({
//               success: false,
//               errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
//             });
//           }
//           // logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
//           return res.status(201).json({
//             success: true,
//             Message: '게시글이 성공적으로 포스팅 되었습니다!.'
//           });
//         });
//       } catch (err) {
//         // logger.error('게시글 작성 중 에러가 발생 했습니다: ', err);
//         return res.status(500).json({
//           success: false,
//           errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
//         });
//       }
//     })

// module.exports = router;

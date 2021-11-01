// 선희님! 하시죠! 
const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth'); 
// const { db } = require('../models/index');
const db_config = require('../models/index');
const db = db_config.init();
//__dirname; 라는 키워드로 경로에 대한 정보를 제공 굳이 있어야 하나?
db_config.connect(db);
const dotenv = require('dotenv');
dotenv.config();

// const mysql = require('mysql');
// const db = mysql.createConnection({
//   host: 'localhost',
//   port : 3000,
//   user: 'root',
//   password: 'test',
//   database: 'dogdogdog',
// });
// db.connect();

//가라로 만든 약속등록하기*수정필요
// router.post('/wirte', async (req, res) => {
//   try {
//     const { locationCategory, meetingDate, meetingTime, dogCount, wishDesc, longtitude, latitude, locationAddress } = req.body;
//     const userNickname = req.user.userNickname;
    // const created_at = new Date();
    // const created_at = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//     const params = [
//       locationCategory,
//       userNickname,
//       meetingDate,
//       meetingTime,
//       dogCount,
//       wishDesc,
//       longtitude,
//       latitude,
//       locationAddress,
//     ]; 
//     const query =
//       'INSERT INTO post(locationCategory, userNickname, meetingDate, meetingTime, dogCount, wishDesc,longtitude,latitude,locationAddress) VALUES(?,?,?,?,?,?,?,?,?)';
//     await db.query(query, params, (error, rows, fields) => {
//       if (error) {
//         logger.error(`Msg: raise Error in createPost => ${error}`);
//         return res.status(400).json({
//           success: false,
//           errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
//         });
//       }
//       logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
//       return res.status(201).json({
//         success: true,
//         Message: '게시글이 성공적으로 포스팅 되었습니다!.'
//       });
//     });
//   } catch (err) {
//     logger.error('게시글 작성 중 발생한 에러: ', err);
//     return res.status(500).json({
//       success: false,
//       errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
//     });
//   }
// });

//가라로 만든 산책 약속페이지
router.post('/write', async (req, res) => {
  console.log("write post 연결완료!")
  try {
    const {dog_count,wish_desc,completed,location_id,user_id} = req.body;
    console.log(dog_count)
    // const userNickname = req.user.userNickname;
    // const created_at = new Date();
    // const created_at = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
    const params = [
      dog_count,
      wish_desc,
      completed,
      location_id,
      user_id,
    ]; 
    console.log(params)
    const query =
      `INSERT INTO post(dog_count,wish_desc,completed,location_id,user_id) VALUES(?,?,?,?,?)`;
    await db.query(query, params, (error, rows, fields) => {
      if (error) {
        console.log(error)
        // logger.error(`Msg: raise Error in createPost => ${error}`);
        return res.status(400).json({
          success: false,
          errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
        });
      }
      // logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
      return res.status(201).json({
        success: true,
        Message: '게시글이 성공적으로 포스팅 되었습니다!.'
      });
    });
  } catch (err) {
    // logger.error('게시글 작성 중 발생한 에러: ', err);
    return res.status(500).json({
      success: false,
      errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
    });
  }
});

//산책 약속 상세 조회하기
router.get('/:post_id', function (req, res, next) {
  const {post_id} = req.params;
  console.log("get method 연결완료!")
  try {
    const query = `select * from post where post.post_id=${post_id}`; //db에서 모든 포스트를 다 가지고 오겠다!
    db.query(query, (error, rows) => {
      if (error) {
        // logger.error('게시글 조회 중 발생한 DB관련 에러', error);
        return res.sendStatus(400);
      }
      // logger.info('게시글을 성공적으로 조회했습니다.');
      res.status(200).json({
        success: true,
        posts: rows,
      });
      console.log(rows)
    });
  } catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
});


module.exports = router;
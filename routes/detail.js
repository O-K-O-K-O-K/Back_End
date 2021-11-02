const express = require('express');
const multer = require('multer')
const router = express.Router();
const util = require('util');
// const auth = require('../middlewares/auth'); 
const db_config = require('../models/index');
const db = db_config.init();
db_config.connect(db);
const dotenv = require('dotenv');
dotenv.config();
const daum = require('daum-map-api');
const util = require('util'); //현재시간을 찍어주는 모듈 
// const { JsonWebTokenError } = require('jsonwebtoken');


//산책 약속페이지
router.post('/write', async (req, res) => {
  console.log("write post 연결완료!")
  const completed = false;
  const user_id = 1 // const user_id = req.user.user_id;
  try {
    const {meeting_date,wish_desc,location_category,longitude,latitude,location_address} = req.body;
    const params= [
      meeting_date,
      wish_desc,
      completed,
      location_category,
      longitude,
      latitude,
      location_address,
      user_id
    ];  
    const query =
    'INSERT INTO post (meeting_date,wish_desc,completed,location_category,longitude,latitude,location_address,user_id) VALUES(?,?,?,?,?,?,?,?)';
      await db.query(query, params, (error, rows, fields) => {
        console.log("row는",rows)
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
      console.log(err)
      return res.status(500).json({
        success: false,
        errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
      });     
    }
  })
  //   try {
  //     const {meeting_date,meeting_time,dog_count,wish_desc,completed} = req.body;
  //     const user_id = 1 // const user_id = req.user.user_id;
  //     const location_id = 1,
  //     const params_post = [
  //       meeting_date,
  //       meeting_time,
  //       dog_count,
  //       wish_desc,
  //       completed,
  //       user_id
  //     ];  
  //     const query_post =
  //     'INSERT INTO location (lmeeting_date,meeting_time,dog_count,wish_desc,completed,user_id,location_id) VALUES(?,?,?,?,?,?,?)';
  //       await db.query(query_post, params_post, (error, rows, fields) => {
  //         if (error) {
  //           console.log(error)
  //           // logger.error(`Msg: raise Error in createPost => ${error}`);
  //           return res.status(400).json({
  //             success: false,
  //             errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
  //           });
  //         }
  //         // logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
  //         return res.status(201).json({
  //           success: true,
  //           Message: '게시글이 성공적으로 포스팅 되었습니다!.'
  //         });
  //       });
  //     } catch (err) {
  //       // logger.error('게시글 작성 중 발생한 에러: ', err);
  //       console.log(err)
  //       return res.status(500).json({
  //         success: false,
  //         errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
  //       });
  //     }

//산책 약속 상세 조회하기
router.get('/:post_id', function (req, res, next) {
  const {post_id} = req.params;
  const user_id = 1 // const user_id = req.user.user_id;
  console.log("user_id는",user_id)
  console.log("get method 연결완료!")
  try {
    const query = `select * from (dog left join user on dog.user_id = user.user_id) right join post on dog.user_id = post.user_id where post.post_id=${post_id} `;
    db.query(query, (error, rows) => {
      if (error) {
        console.log(error)
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

//산책 게시물 수정하기
router.patch('/:postId', async (req, res) => {
  const post_id = req.params.postId;
  const user_id = 1 // const user_id = req.user.user_id;
  const { location_category, meeting_date, wish_desc,longitude,latitude,location_address,completed} = req.body;
  const escapeQuery = {
    location_category: location_category,
    meeting_date: meeting_date,
    wish_desc: wish_desc,
    longitude:longitude,
    latitude:latitude,
    location_address:location_address,
    completed:completed,
  };
  const query = `UPDATE post SET ? WHERE post_id = ${post_id} and user_id = '${user_id}'`;
  await db.query(query, escapeQuery, (error, rows, fields) => {
    if (error) {
      console.log(error)
      // logger.error('게시글 수정 중 발생한 DB관련 에러: ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    } else {
      // logger.info('게시글을 성공적으로 수정하였습니다.');
      return res.status(200).json({
        success: true,
      });
    }
  });
});

// 게시글 삭제
router.delete('/:postId', async (req, res) => {
  const  post_id  = req.params.postId;
  const user_id = 1 // const user_id = req.user.user_id;
  const query = `DELETE from post where post_id = ${post_id} and user_id = '${user_id}'`;
  try {
    await db.query(query, (error, rows, fields) => {
      if (error) {
        // logger.error('게시글 삭제 중 쿼리문 에러가 발생하였습니다. :', error);
        return res.status(400).json({
          success: false,
        });
      }
      // logger.info('게시글을 성공적으로 삭제하였습니다.');
      res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});


module.exports = router;
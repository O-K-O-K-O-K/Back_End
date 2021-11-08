const express = require('express');
const multer = require('multer')
const router = express.Router();
const auth = require('../middlewares/auth'); 
const { db } = require("../models/index");

const dotenv = require('dotenv');
dotenv.config();
// const util = require('util'); //현재시간을 찍어주는 모듈 
// const { JsonWebTokenError } = require('jsonwebtoken');


//산책 약속페이지 등록하기
router.post('/write', auth, async (req, res) => {
  console.log("write post 연결완료!")
  const completed = false;
  const user_id = res.locals.user.user_id;
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


//산책 약속 상세 조회하기
router.get('/:post_id', auth, function (req, res, next) {
  const {post_id} = req.params;
  const user_id = res.locals.user.user_id;
  console.log("get method 연결완료!")
  try {
    const query = 
    `SELECT dog.dog_id, dog.dog_gender, dog.dog_name, dog.dog_size, dog.dog_breed, dog.dog_age, dog.neutral, dog.dog_comment, dog.dog_image,
    post.user_id, post.post_id, post.meeting_date, post.wish_desc, post.created_at, post.completed, post.location_category, post.longitude, post.latitude, post.location_address,
    user.user_nickname, user.user_gender, user.user_age, user.user_image
    from post
    join dog
    on post.user_id = dog.user_id
    join user
    on user.user_id = dog.user_id
    WHERE post.post_id =${post_id}`;
    db.query(query, (error, rows) => {
      if (error) {
        console.log(error)
        // logger.error('게시글 조회 중 발생한 DB관련 에러', error);
        return res.sendStatus(400);
      }
      // logger.info('게시글을 성공적으로 조회했습니다.');
      res.status(200).json({
        success: true,
        posts: rows[0],
      });
      console.log("rows는", rows[0])
    });
  } catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
});

//메인 조회하기
router.get('/', function (req, res, next) {
  console.log("get method 연결완료!")
  const {dog_size,dog_gender, dog_age, location_category, completed} = req.body;
  console.log(dog_size, dog_gender, dog_age, location_category, completed)

  if (location_category == undefined) {
    console.log(1)
  } else (console.log(2))
  // let {selected_category} =req.body
  // const [filter, subfilter] = selected_category.split("_");
  // console.log(filter) //all 을 했을때 안쓰게 하는 방법!
  try {
    const query = 
    `SELECT dog.dog_id, dog.dog_gender, dog.dog_name, dog.dog_size, dog.dog_breed, dog.dog_age, dog.neutral, dog.dog_comment, dog.dog_image, dog.user_id,
    post.user_id, post.post_id, post.meeting_date, post.completed, post.location_category  
    FROM post
    JOIN dog
    ON dog.user_id=post.user_id
    WHERE
    dog.dog_size = '${dog_size}' OR
    dog.dog_gender = '${dog_gender}' OR
    dog.dog_age = '${dog_age}' OR
    post.location_category = '${location_category}' OR
    post.completed = '${completed}'
    `;
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
      console.log("rows는", rows)
    });
  } catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
});

//산책 게시물 수정하기
router.patch('/:postId',auth, async (req, res) => {
  const post_id = req.params.postId;
  const user_id = res.locals.user.user_id;
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

//유저가 마감 하기 
router.patch('/completion/:postId', auth, async (req, res) => {
  console.log("마감여부 접속 완료 ")
  try {
  const post_id = req.params.postId;
  const user_email = res.locals.user.user_email;
  console.log("user_email",user_email)
  const user_id = res.locals.user.user_id;
  const {completed} = req.body;
  const escapeQuery = {
    completed:completed
  }
  const query = `UPDATE post SET ? WHERE post_id = ${post_id} and user_id = '${user_id}'`;
  await db.query(query, escapeQuery, (error,rows,fields) => {
    if (error) {
      console.log("에러는", error)
      // logger.error('게시글 수정 중 발생한 DB관련 에러: ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    } else {
      return res.status(200).json({
        success: true,
      })
    }
  })
} catch (err) {
  // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
  return res.sendStatus(500);
}

} )


// 게시글 삭제
router.delete('/:postId', auth, async (req, res) => {
  const  post_id  = req.params.postId;
  const user_id = res.locals.user.user_id;

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
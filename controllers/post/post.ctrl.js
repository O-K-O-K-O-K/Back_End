"use strict";
const { db } = require("../../models/index");


const putUpPosts = async (req, res) => {
    const completed = 0;
    const userId = res.locals.user.userId;
    try {
      const {meetingDate,wishDesc,locationCategory, dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName} = req.body;
      console.log(meetingDate)
      const params= [
        meetingDate,
        wishDesc,
        completed,
        locationCategory,
        dogCount,
        totalTime,
        startLocationAddress,
        endLocationAddress,
        totalDistance,
        routeColor,
        routeName,
        userId,
      ];
      const query =
      'INSERT INTO post (meetingDate,wishDesc,completed,locationCategory,dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName, userId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        await db.query(query, params, (error, rows, fields) => {
          console.log("row는",rows)
          if (error) {
            console.log(error)
            // logger.error('게시글 저장 중 DB관련 에러가 발생 했습니다', error);
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
        // logger.error('게시글 작성 중 에러가 발생 했습니다: ', err);
        return res.status(500).json({
          success: false,
          errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
        });
      }
    }
const getDetailPosts = async (req, res, next) => {
    const {postId} = req.params;
    const userId = res.locals.user.userId;
    try {
      //산책 신청 여부 판단 코드 
      let existRequest
      const check = `SELECT notification.checkRequest from notification 
      where notification.postId =${postId} and notification.senderId = ${userId}`
      let requestCheck = await db.query(check)
      existRequest = requestCheck[0]
      if (!existRequest) {
        existRequest = 0
      } else existRequest = 1
      const query =
      `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage,
      post.userId, post.postId, post.meetingDate, post.wishDesc, post.locationCategory, post.dogCount, post.createdAt, post.completed, post.totalTime, post.startLocationAddress, post.endLocationAddress, post.totalDistance, post.routeColor, post.routeName,
      user.userNickname, user.userGender, user.userAge, user.userImage,user.userId, 
      (SELECT
        CASE
        WHEN TIMESTAMPDIFF(MINUTE, post.createdAt,NOW())<=0 THEN '방금 전'
        WHEN TIMESTAMPDIFF(MINUTE, post.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, post.createdAt, NOW()), '분 전')
        WHEN TIMESTAMPDIFF(HOUR, post.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, post.createdAt, NOW()), '시간 전')
        WHEN TIMESTAMPDIFF(DAY, post.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, post.createdAt, NOW()), '일 전')
        ELSE post.createdAt
        END) AS AGOTIME
      from post
      join dog
      on post.userId = dog.userId
      join user
      on user.userId = dog.userId
      WHERE post.postId ='${postId}'`;
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        res.status(200).json({
          success: true,
          posts: rows[0],
          existRequest
        });
      });
    } catch (err) {
      // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
      return res.sendStatus(500);
    }
  }
const modifyPosts = async (req, res) => {
    try{
    const postId = req.params.postId;
    const userId = res.locals.user.userId;
    const {locationCategory, meetingDate, wishDesc, dogCount,startLocationAddress,endLocationAddress,completed,totalDistance,totalTime,routeColor,routeName} = req.body;
    const escapeQuery = {
      locationCategory: locationCategory,
      meetingDate: meetingDate,
      wishDesc: wishDesc,
      dogCount:dogCount,
      startLocationAddress:startLocationAddress,
      endLocationAddress:endLocationAddress,
      completed:completed,
      totalDistance:totalDistance,
      totalTime:totalTime,
      totalDistance:totalDistance,
      routeColor:routeColor,
      routeName:routeName,
      // coordinate:coordinate
    };
    const query = `UPDATE post SET ? WHERE postId = ${postId} and userId = '${userId}'`;
    await db.query(query, escapeQuery, (error, rows, fields) => {
      if (error) {
        console.log(error)
        // logger.error('게시글 수정 중 DB관련 에러가 발생했습니다', error);
        return res.status(400).json({
          success: false,
          error,
        });
      } else {
        // logger.info('게시글을 성공적으로 수정하였습니다.');
        return res.status(200).json({
          success: true,
          posts: rows,
        });
      }
    });
  } catch (err) {
    // logger.error('게시물 수정하기 중 예상하지 못한 에러가 밣생 했습니다', err);
    return res.sendStatus(500);
  }
  }
const completePlans = async (req, res) => {
    try {
    const postId = req.params.postId;
    const userEmail = res.locals.user.userEmail;
    const userId = res.locals.user.userId;
    const {completed} = req.body;
    const escapeQuery = {
      completed:completed
    }
    const query = `UPDATE post SET ? WHERE postId = ${postId} and userId = '${userId}'`;
    await db.query(query, escapeQuery, (error,rows,fields) => {
      if (error) {
        // logger.error('마감 여부 설정 중 DB관련 에러가 발생했습니다', error);
        return res.status(400).json({
          success: false,
          error,
        });
      } else {
        // logger.info('마감 여부가 성공적으로 바뀌었습니다');
        return res.status(200).json({
          success: true,
        })
      }
    })
  } catch (err) {
    // logger.error('마감 여부 설정 중 예상하지 못한 에러가 밣생 했습니다', err);
    return res.sendStatus(500);
  }
  }
const deletePosts =async (req, res) => {
    const  postId  = req.params.postId;
    const userId = res.locals.user.userId;
    const query = `DELETE from post where postId = ${postId} and userId = '${userId}'`;
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
      // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
    }
  }
  module.exports = {
    putUpPosts,
    getDetailPosts,
    modifyPosts,
    completePlans,
    deletePosts
  }

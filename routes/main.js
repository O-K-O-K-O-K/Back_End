const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); 
const { db } = require("../models/index");
const dotenv = require('dotenv');
// const { ConnectContactLens } = require('aws-sdk');
// const logger = require("../src/config/logger")
dotenv.config();
// const util = require('util'); //현재시간을 찍어주는 모듈 
// const { JsonWebTokenError } = require('jsonwebtoken');

//메인 조회하기 - 올림픽 공원
router.get('/olympicPark', function (req, res, next) {
    let conditions = [];
    let where
    console.log("get method 연결완료!")
    const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
    console.log(dogSize, dogGender, dogAge, locationCategory, completed)
    const location = "올림픽공원"
    try {
  
      const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
      post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
      FROM post
      JOIN dog
      ON dog.userId=post.userId 
      ORDER BY post.createdAt DESC ` 
      console.log('query',query);
  
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
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
      // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
      return res.sendStatus(500);
    }
  });
  
  //메인 조회하기 - 반포 한강공원
  router.get('/banpoPark', function (req, res, next) {
    let conditions = [];
    let where
    console.log("get method 연결완료!")
    const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
    console.log(dogSize, dogGender, dogAge, locationCategory, completed)
    const location = "반포한강공원"
    try {
  
      const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
      post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
      FROM post
      JOIN dog
      ON dog.userId=post.userId 
      where post.locationCategory =${location}
      ORDER BY post.createdAt DESC ` 
      console.log('query', typeof query);
  
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
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
      // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
      return res.sendStatus(500);
    }
  });
  
  //메인 조회하기 - 서울숲
  router.get('/seoulForest', function (req, res, next) {
    let conditions = [];
    let where
    console.log("get method 연결완료!")
    const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
    console.log(dogSize, dogGender, dogAge, locationCategory, completed)
    try {
  
      const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
      post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
      FROM post
      JOIN dog
      ON dog.userId=post.userId 
      where post.locationCategory ="서울숲"
      ORDER BY post.createdAt DESC ` 
      console.log('query', typeof query);
  
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        res.status(200).json({
          success: true,
          posts: rows,    
        });
        console.log("rows는", rows)
        // logger.info('게시글을 성공적으로 조회했습니다.');
      });
  
    } catch (err) {
      // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
      return res.sendStatus(500);
    }
  });
  
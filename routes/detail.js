const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const auth = require('../middlewares/auth')
const ctrl = require('../controllers/post/mainPost.ctrl')
const ctrlPosts = require('../controllers/post/post.ctrl')
const { db } = require('../models/index')
dotenv.config()
// const { ConnectContactLens } = require('aws-sdk');
// const logger = require("../src/config/logger")
// const util = require('util'); //현재시간을 찍어주는 모듈
// const { JsonWebTokenError } = require('jsonwebtoken');

//메인 조회하기 - 전체 조회하기(테스트)
router.get('/test', ctrl.getAllPosts)
//메인 조회하기 - 올림픽 공원(테스트)
router.get('/test/olympicPark', ctrl.getOlympicParkPosts)
//메인 조회하기 - 서울숲(테스트)
router.get('/test/seoulForest', ctrl.getSeoulForestPosts)
//메인 조회하기 - 반포한강공원(테스트)
router.get('/test/banpoPark', ctrl.getBanpoParkPosts)
//산책 약속페이지 등록하기
router.post('/write', auth, ctrlPosts.putUpPosts)
//산책 약속 상세 조회하기
router.get('/:postId', auth, ctrlPosts.getDetailPosts)
//산책 게시물 수정하기
router.patch('/:postId', auth, ctrlPosts.modifyPosts)
//유저가 마감 하기
router.patch('/completion/:postId', auth, ctrlPosts.completePlans)
// 게시글 삭제
router.delete('/:postId', auth, ctrlPosts.deletePosts)

//메인 페이지 조회하기 - 올림픽 공원
router.get('/main/olympicPark', async (req, res) => {
    const location = '올림픽공원'
    try {
        const postCount = `SELECT count(*) as count FROM post where post.locationCategory = '${location}'`
        const results = await db.query(postCount)
        // console.log("results", results); //[ RowDataPacket { count: 13 } ]
        const totalCount = results[0].count // NOTE: 전체 글 개수.
        // console.log("totoal",totalCount)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
            post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory,
            (select count(*) from post where post.locationCategory ='${location}') as length
            FROM post
            JOIN dog
            ON dog.userId=post.userId
            where post.locationCategory ='${location}'
            ORDER BY post.createdAt DESC 
            LIMIT 4`
        console.log(query2)
        db.query(query2, (error, results) => {
            console.log('들어오니')
            if (error) {
                console.log(error)
                // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
                return res.sendStatus(400)
            }
            const result = {
                success: true,
                posts: results,
                totalCount,
            }
            res.status(200).json({
                success: true,
                posts: result,
            })
            console.log('rows는', result)
        })
    } catch (err) {
        console.log(err)
        // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
        return res.sendStatus(500)
    }
})
router.get('/main/banpoPark', async (req, res) => {
    const location = '반포한강공원'
    try {
        const postCount = `SELECT count(*) as count FROM post where post.locationCategory = '${location}'`
        const results = await db.query(postCount)
        // console.log("results", results); //[ RowDataPacket { count: 13 } ]
        const totalCount = results[0].count // NOTE: 전체 글 개수.
        // console.log("totoal",totalCount)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
              post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory,
              (select count(*) from post where post.locationCategory ='${location}') as length
              FROM post
              JOIN dog
              ON dog.userId=post.userId
              where post.locationCategory ='${location}'
              ORDER BY post.createdAt DESC 
              LIMIT 4`
        console.log(query2)
        db.query(query2, (error, results) => {
            console.log('들어오니')
            if (error) {
                console.log(error)
                // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
                return res.sendStatus(400)
            }
            const result = {
                success: true,
                posts: results,
                totalCount,
            }
            res.status(200).json({
                success: true,
                posts: result,
            })
            console.log('rows는', result)
        })
    } catch (err) {
        console.log(err)
        // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
        return res.sendStatus(500)
    }
})
router.get('/main/seoulForest', async (req, res) => {
    const location = '서울숲'
    try {
        const postCount = `SELECT count(*) as count FROM post where post.locationCategory = '${location}'`
        const results = await db.query(postCount)
        // console.log("results", results); //[ RowDataPacket { count: 13 } ]
        const totalCount = results[0].count // NOTE: 전체 글 개수.
        // console.log("totoal",totalCount)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
              post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory,
              (select count(*) from post where post.locationCategory ='${location}') as length
              FROM post
              JOIN dog
              ON dog.userId=post.userId
              where post.locationCategory ='${location}'
              ORDER BY post.createdAt DESC 
              LIMIT 4`
        console.log(query2)
        db.query(query2, (error, results) => {
            console.log('들어오니')
            if (error) {
                console.log(error)
                // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
                return res.sendStatus(400)
            }
            const result = {
                success: true,
                posts: results,
                totalCount,
            }
            res.status(200).json({
                success: true,
                posts: result,
            })
            console.log('rows는', result)
        })
    } catch (err) {
        console.log(err)
        // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
        return res.sendStatus(500)
    }
})

module.exports = router

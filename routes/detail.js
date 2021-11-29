const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); 
const ctrl = require("../controllers/post/post.ctrl");
const dotenv = require('dotenv');
dotenv.config();
// const { ConnectContactLens } = require('aws-sdk');
// const logger = require("../src/config/logger")

//산책 약속페이지 등록하기
router.post('/write', auth, ctrl.putUpPosts)
//메인 조회하기 - 올림픽 공원
router.get('/olympicPark', ctrl.showOlympicParkPosts)
//메인 조회하기 - 반포 한강공원
router.get('/banpoPark', ctrl.showBanpoParkPosts)
//메인 조회하기 - 서울숲
router.get('/seoulForest',ctrl.showSeoulForestPosts)
//메인 조회하기 - 전체 조회하기
router.get('/', ctrl.showAllPosts);
//카테고리 전체 조회
router.get('/category',ctrl.sortPosts);
//산책 약속 상세 조회하기
router.get('/:postId', auth, ctrl.showSpecificPage);
//산책 게시물 수정하기
router.patch('/:postId',auth, ctrl.editPosts);
//유저가 마감 하기 
router.patch('/completion/:postId', auth, ctrl.completePlans)
// 게시글 삭제
router.delete('/:postId',auth, ctrl.deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const auth = require('../middlewares/auth');
const ctrl = require("../controllers/post/mainPost.ctrl")
const ctrlPosts = require("../controllers/post/post.ctrl")
dotenv.config();

//메인 조회하기 - 전체 조회하기(테스트)
router.get('/test', ctrl.getAllPosts);
//메인 조회하기 - 올림픽 공원(테스트)
router.get('/test/olympicPark', ctrl.getOlympicParkPosts);
//메인 조회하기 - 서울숲(테스트)
router.get('/test/seoulForest', ctrl.getSeoulForestPosts);
//메인 조회하기 - 반포한강공원(테스트)
router.get('/test/banpoPark', ctrl.getBanpoParkPosts);
//산책 약속페이지 등록하기
router.post('/write', auth, ctrlPosts.putUpPosts)
//산책 약속 상세 조회하기
router.get('/:postId', auth, ctrlPosts.getDetailPosts);
//산책 게시물 수정하기
router.patch('/:postId',auth, ctrlPosts.modifyPosts);
//유저가 마감 하기
router.patch('/completion/:postId', auth, ctrlPosts.completePlans)
// 게시글 삭제
router.delete('/:postId', auth, ctrlPosts.deletePosts);

module.exports = router;
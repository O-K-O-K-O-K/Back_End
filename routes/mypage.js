const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const ctrl = require('../controllers/mypage/mypage.ctrl')

// 마이페이지에서 내가 쓴 글 조회하기
router.get('/myPost/:userId', ctrl.getMyPagePost)
// 마이페이지에서 유저/강아지 정보 조회,
router.get('/myInfo/:userId', ctrl.getMyPageInfo)

module.exports = router

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const dotenv = require('dotenv')
dotenv.config()
const ctrl = require('../controllers/like/dogstaLike.ctrl')

// 개스타그램 좋아요 누르기
router.post('/:dogPostId', auth, ctrl.addDogstaLike)
// 개스타그램 좋아요 본인이 눌렀냐 안 눌렀냐 여부
router.get('/:dogPostId/likeExist', auth, ctrl.getLikeExist)
// 개스타그램 총 좋아요 수 조회하기
router.get('/:dogPostId', ctrl.getLikeCount)
// 개스타그램 좋아요 취소하기
router.delete('/:dogPostId', auth, ctrl.deleteDogstaLike)

module.exports = router

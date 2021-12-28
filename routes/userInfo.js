const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const upload = require('../S3/s3')
const dotenv = require('dotenv')
dotenv.config()
const ctrl = require('../controllers/user/userInfo.ctrl')

// 내 정보 조회하기
router.get('/me', auth, ctrl.getMyInfo)
// 내 사진 수정하기
router.patch('/changeImage', upload.single('userImage'), auth, ctrl.updateMyPic)
// 내 정보 수정하기
router.patch('/me', auth, ctrl.updateMyInfo)
// 강아지 등록 여부
router.get('/dogExist', auth, ctrl.getDogExist)

module.exports = router

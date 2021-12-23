const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const dotenv = require('dotenv')
dotenv.config()
const upload = require('../S3/s3')
const ctrl = require('../controllers/dog/dog.ctrl')

// 강아지 정보 등록하기
router.post('/dogInfo', upload.single('dogImage'), auth, ctrl.addDog)
// 강아지 정보 조회하기
router.get('/', auth, ctrl.getDog)
// 강아지 사진 수정하기
router.patch('/changeImage', upload.single('dogImage'), auth, ctrl.updateDogPic)
// 강아지 정보 수정하기
router.patch('/', auth, ctrl.updateDogInfo)

module.exports = router

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const ctrl = require("../controllers/user/user.ctrl");

//로그인 - controllers
// 강아지 정보 등록하기
router.post("/login", ctrl.loginUser);
// 회원가입  여기 미들웨어(upload.single("userImage)
router.post("/signUp", upload.single("userImage"), ctrl.postUser);
//이메일 중복확인]
router.post("/checkDup", ctrl.checkDup);

module.exports = router;

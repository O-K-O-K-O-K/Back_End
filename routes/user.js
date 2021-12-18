const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const upload = require("../S3/s3");
dotenv.config();
const ctrl = require("../controllers/user/user.ctrl");

//로그인
router.post("/login", ctrl.loginUser);
// 회원가입 
router.post("/signUp", upload.single("userImage"), ctrl.postUser);
//이메일 중복확인]
router.post("/checkDup", ctrl.checkDup);

module.exports = router;

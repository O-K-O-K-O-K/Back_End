const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const ctrl = require("../controllers/dogsta/dogsta.ctrl");

// 개스타그램 글 등록하기
router.post('/write', upload.single("dogPostImage"), auth, ctrl.addDogsta);
// 개스타그램 조회하기 -> 마이페이지 누르면 보이는 화면
router.get("/:userId", ctrl.getDogsta);
// 개스타그램 상세 조회하기
router.get("/:userId/:dogPostId", ctrl.getDetailDogsta);
// 개스타그램 사진 수정하기
router.patch("/changeImage/:dogPostId",upload.single("dogPostImage"), auth, ctrl.updateDogstaPic);
// 개스타그램 정보 수정하기
router.patch("/:dogPostId", auth, ctrl.updateDogstaInfo);
// 개스타그램 글 삭제하기
router.delete('/:dogPostId', auth, ctrl.deleteDogsta);

// // 개스타그램 메인 조회하기_추천순 페이지네이션
// router.get("/test/likeFilter", ctrl2.getLikeFilter);
// // 개스타그램 메인 조회하기_최신순 페이지네이션
// router.get("/test/recentFilter", ctrl2.getRecentFilter);
// //메인페이지_최신순 10개만
// router.get("/mainFilter", ctrl2.getMainFilter);


module.exports = router;
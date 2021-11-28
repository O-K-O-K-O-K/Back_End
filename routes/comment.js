const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { db } = require("../models/index");
const ctrl = require("../controllers/comment/comment.ctrl")

//댓글 등록
router.post("/:dogPostId", auth, ctrl.putUpComments);
//댓글 조회 auth 없음
router.get("/:dogPostId", ctrl.showComments);
//댓글 수정
router.patch("/:dogPostId/:commentId", auth, ctrl.modifyComments);
//댓글 삭제
router.delete("/:dogPostId/:commentId", auth, ctrl.deleteComments);
module.exports = router;
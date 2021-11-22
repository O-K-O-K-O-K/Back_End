const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { db } = require("../models/index");

//댓글 등록
router.post("/:dogPostId", auth, async (req, res) => {
  const { dogPostId } = req.params;
  const userId = res.locals.user.userId;
  const { commentDesc } = req.body;
  let params = {
    commentDesc: commentDesc,
    dogPostId: dogPostId,
    userId: userId,
  };
  try {
    const post = `INSERT INTO comment set ?;`;
    await db.query(post, params, (error, results, fields) => {
      if (error) {
        console.log("댓글 등록 오류", error);
        res.status(400).send(error);
      } else {
        res.status(200).send({ results });
      }
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

//댓글 조회 auth 없음
router.get("/:dogPostId", async (req, res) => {
  const { dogPostId } = req.params;

  try {
    const commentQuery = `SELECT comment.commentId, comment.dogPostId, comment.commentDesc, comment.createdAt, user.userId, user.userNickname,
    (SELECT
      CASE
      WHEN TIMESTAMPDIFF(MINUTE,comment.createdAt,NOW())<=0 THEN '방금 전'
      WHEN TIMESTAMPDIFF(MINUTE, comment.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, comment.createdAt, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR, 'comment.createdAt', NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, 'comment.createdAt', NOW()), '시간 전')
      ELSE concat(DATEDIFF(NOW(),comment.createdAt),'일 전')
      END) AS AGOTIME 
      FROM comment
      JOIN user
      ON user.userId = comment.userId
      WHERE comment.dogPostId = "${dogPostId}"`;

    await db.query(commentQuery, (error, rows) => {
      if (error) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).send({
        comment: rows,
      });
    });
  } catch (err) {
    return res.sendStatus(500);
  }
});

//댓글 수정
router.patch("/:dogPostId/:commentId", auth, async (req, res) => {
  const { dogPostId, commentId } = req.params;
  const { commentDesc } = req.body;
  //여기 한번 확인해야함 유저가 맞는지
  const userId = res.locals.user.userId;
  let params = {
    commentDesc: commentDesc,
  };
  try {
    const post = `UPDATE comment SET ? WHERE comment.userId ='${userId}'`;
    await db.query(post, params, (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).send("댓글 수정 오류", error);
      } else {
        res.status(200).send({ results });
      }
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

//댓글 삭제
router.delete("/:dogPostId/:commentId", auth, async (req, res) => {
    const { dogPostId, commentId } = req.params;
    const userId = res.locals.user.userId;

  const query = `DELETE from comment where commentId = "${commentId}" AND dogPostId = "${dogPostId}"`;
  try {
    await db.query(query, (error, rows, fields) => {
      if (error) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
});

module.exports = router;

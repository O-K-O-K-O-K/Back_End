"use strict";
const { db } = require("../../models/index");

const addDogstaLike = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { dogPostId } = req.params;

    let existLike;
    const isLiked = `SELECT * FROM likes WHERE dogPostId ="${dogPostId}" AND userId= "${userId}"`;
    const results = await db.query(isLiked);
    existLike = results[0];

    //좋아요 생성 전
    if (!existLike) {
      const params = [dogPostId, userId];
      const query = `INSERT INTO likes (dogPostId, userId) VALUES(?, ?)`;
      await db.query(query, params, (error, rows) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).send({
          existLike: true,
          msg: "좋아요를 눌렀습니다.",
        });
      });
    } else {
      // user가 좋아요를 이미 누른 상태에서 한번 더 눌렀을 경우
      return res.status(400).send({
        msg: "좋아요를 이미 누르셨습니다.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: "좋아요 기능이 안됩니다. 관리자에게 문의하세요",
    });
  }
};

const getLikeExist = async (req, res) => {
  const { dogPostId } = req.params;
  const userId = res.locals.user.userId;
  const likeExist = `SELECT * FROM likes WHERE dogPostId = "${dogPostId}" AND userId ="${userId}"`;
  const results = await db.query(likeExist);

  if (results.length) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const getLikeCount = async (req, res) => {
  try {
    const { dogPostId } = req.params;

    let likeCount;
    const likeUser = `SELECT dogPostId FROM likes WHERE dogPostId ="${dogPostId}"`;
    const results = await db.query(likeUser);
    likeCount = results[0];

    if (likeCount) {
      let likeNum;
      const likeQuery = `SELECT COUNT(dogPostId) as count FROM likes WHERE dogPostId ="${dogPostId}"`;
      const results = await db.query(likeQuery);
      likeNum = results[0];

      await db.query(likeQuery, (error, rows) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).send({
          likeNum,
        });
      });
    } else {
      let likeNum;
      const likeQuery = `SELECT COUNT(dogPostId) as count FROM likes WHERE dogPostId ="${dogPostId}"`;
      const results = await db.query(likeQuery);
      likeNum = results[0];

      await db.query(likeQuery, (error, rows) => {
        if (error) {
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).send({
          likeNum,
        });
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: "관리자에게 문의하세요",
    });
  }
};

const deleteDogstaLike = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { dogPostId } = req.params;

    let existLike;
    const isLiked = `SELECT * FROM likes WHERE dogPostId ="${dogPostId}" AND userId= "${userId}"`;
    const results = await db.query(isLiked);
    existLike = results[0];

    if (existLike) {
      const query = `DELETE from likes where dogPostId = '${dogPostId}' and userId = '${userId}'`;
      await db.query(query, (error, rows) => {
        if (error) {
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).send({
          existLike: false,
          msg: "좋아요가 취소 되었습니다.",
        });
      });
    } else {
      return res.status(400).send({
        msg: "이미 좋아요를 취소하였습니다.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: "좋아요 취소 기능이 안됩니다. 관리자에게 문의하세요",
    });
  }
};

module.exports = {
  addDogstaLike,
  getLikeExist,
  getLikeCount,
  deleteDogstaLike,
};

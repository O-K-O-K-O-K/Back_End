"use strict";
const { db } = require("../../models/index");

const addDogsta = async (req, res) => {
  const userId = res.locals.user.userId;

  try {
    const { dogPostDesc } = req.body;
    const dogPostImage = req.file.transforms[0].location;
    const params = [dogPostDesc, dogPostImage, userId];

    const query = `INSERT INTO dogSta(dogPostDesc, dogPostImage, userId) VALUES(?,?,?)`;

    await db.query(query, params, (error, rows, fields) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "개스타그램 등록 실패!",
        });
      }
      return res.status(201).json({
        success: true,
        msg: "개스타그램 등록 성공!",
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
};

const getDogsta = async (req, res) => {
  const { userId } = req.params;

  let existDogPost;
  const dogPost = `SELECT * FROM dogSta WHERE dogSta.userId = "${userId}"`;
  const results = await db.query(dogPost);
  existDogPost = results[0];

  console.log("existDogPost", existDogPost);

  //작성된 개스타그램 post가 없다면
  if (!existDogPost) {
    //유저 정보 보내준다
    const query = `SELECT * FROM dogSta WHERE dogSta.userId = "${userId}"`;

    await db.query(query, (error, rows) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "개스타그램 조회 실패!",
        });
      }
      return res.status(200).json({
        success: true,
        posts: rows,
      });
    });
  } else {
    // 유정 정보와 개스타그램 post 정보를 다 보내준다.
    // 내림차순으로 정렬(최신순으로)
    const query = `SELECT dogSta.dogPostId, dogSta.dogPostImage, dogSta.dogPostDesc, dogSta.createdAt, dogSta.userId, 
      user.userNickname, user.userImage, user.userLocation,
      (SELECT
        CASE
        WHEN TIMESTAMPDIFF(MINUTE, dogSta.createdAt,NOW())<=0 THEN '방금 전'
        WHEN TIMESTAMPDIFF(MINUTE, dogSta.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, dogSta.createdAt, NOW()), '분 전')
        WHEN TIMESTAMPDIFF(HOUR, dogSta.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, dogSta.createdAt, NOW()), '시간 전')
        WHEN TIMESTAMPDIFF(DAY, dogSta.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, dogSta.createdAt, NOW()), '일 전')
        ELSE dogSta.createdAt
        END) AS AGOTIME
      FROM dogSta
      LEFT JOIN user 
      ON dogSta.userId = user.userId
      WHERE dogSta.userId= "${userId}"
      ORDER BY dogSta.createdAt DESC`;

    console.log("query", query);

    await db.query(query, (error, rows) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "개스타그램 조회 실패!",
        });
      }
      return res.status(200).json({
        success: true,
        posts: rows,
      });
    });
  }
};

const getDetailDogsta = async (req, res) => {
  const { userId, dogPostId } = req.params;

  try {
    //유정 정보와 개스타그램 post 정보를 다 보내준다.
    const query = `SELECT dogSta.dogPostId, dogSta.dogPostImage, dogSta.dogPostDesc, dogSta.createdAt, dogSta.userId, 
      user.userNickname, user.userImage, user.userLocation,
    (SELECT
      CASE
      WHEN TIMESTAMPDIFF(MINUTE, dogSta.createdAt,NOW())<=0 THEN '방금 전'
      WHEN TIMESTAMPDIFF(MINUTE, dogSta.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, dogSta.createdAt, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR, dogSta.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, dogSta.createdAt, NOW()), '시간 전')
      WHEN TIMESTAMPDIFF(DAY, dogSta.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, dogSta.createdAt, NOW()), '일 전')
      ELSE dogSta.createdAt
      END) AS AGOTIME
      FROM dogSta 
      LEFT JOIN user 
      ON dogSta.userId = user.userId 
      WHERE dogSta.userId = "${userId}"
      AND dogSta.dogPostId= "${dogPostId}"`;

    await db.query(query, (error, rows) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "상세 조회하기 실패",
        });
      }
      return res.status(200).json({
        posts: rows,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateDogstaPic = async (req, res) => {
  const userId = res.locals.user.userId;
  const { dogPostId } = req.params;

  const dogPostImage = req.file.transforms[0].location;

  const escapeQuery = {
    dogPostImage: dogPostImage,
  };

  const userQuery = `UPDATE dogSta SET dogSta.dogPostImage = "${dogPostImage}" 
    WHERE dogSta.dogPostId = "${dogPostId}" AND dogSta.userId = "${userId}"`;

  await db.query(userQuery, escapeQuery, async (err, user) => {
    if (err) {
      return res.status(400).json({
        msg: "개스타그램 사진 변경 실패",
      });
    }
    return res.status(200).json({
      msg: "개스타그램 사진 변경 성공",
      user,
    });
  });
};

const updateDogstaInfo = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { dogPostId } = req.params;

    const { dogPostDesc } = req.body;

    const escapeQuery = {
      dogPostDesc: dogPostDesc,
    };

    const query = `UPDATE dogSta SET ? WHERE dogSta.dogPostId = ${dogPostId} and dogSta.userId = '${userId}'`;

    await db.query(query, escapeQuery, (error, rows, fields) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "수정하기 실패!",
        });
      } else {
        return res.status(200).json({
          success: true,
          dogs: rows,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
};

const deleteDogsta = async (req, res) => {
  const userId = res.locals.user.userId;
  const { dogPostId } = req.params;

  console.log(dogPostId);
  const query = `DELETE from dogSta where dogSta.dogPostId = '${dogPostId}' and dogSta.userId = '${userId}'`;

  console.log(query);
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
};

module.exports = {
  addDogsta,
  getDogsta,
  getDetailDogsta,
  updateDogstaPic,
  updateDogstaInfo,
  deleteDogsta,
};

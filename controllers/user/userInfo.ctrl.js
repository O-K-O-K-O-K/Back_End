"use strict";
const { db } = require("../../models/index");

const getMyInfo = async (req, res) => {
  try {
    const userId = res.locals.user.userId;

    const userQuery = `select user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation from user where user.userId= "${userId}"`;
    await db.query(userQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

const updateMyPic = async (req, res) => {
  const userId = res.locals.user.userId;
  const userImage = req.file.transforms[0].location;

  const escapeQuery = {
    userImage: userImage,
  };
  const userQuery = `UPDATE user SET userImage = "${userImage}" WHERE user.userId = "${userId}"`;
  await db.query(userQuery, escapeQuery, async (err, user) => {
    if (err) {
      return res.status(400).json({
        msg: "유저 사진 변경 실패",
      });
    }
    return res.status(200).json({
      msg: "유저 사진 변경 성공",
      user,
    });
  });
};

const updateMyInfo = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { userNickname, userGender, userAge, userLocation } = req.body;

    const escapeQuery = {
      userNickname: userNickname,
      userGender: userGender,
      userAge: userAge,
      userLocation: userLocation,
    };

    const userQuery = `UPDATE user 
        SET userNickname="${userNickname}", userGender="${userGender}", userAge="${userAge}", 
        userLocation="${userLocation}"
        WHERE user.userId = '${userId}'`;

    await db.query(userQuery, escapeQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        msg: "user 정보 수정 성공! 사진 제외",
        user,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
};

const getDogExist = async (req, res) => {
  const userId = res.locals.user.userId;
  const dog = `SELECT * FROM dog WHERE dog.userId ="${userId}"`;
  const results = await db.query(dog);
  
  if (results.length) {
    res.send(true);
  } else {
    res.send(false);
  }
};

module.exports = {
  getMyInfo,
  updateMyPic,
  updateMyInfo,
  getDogExist,
};

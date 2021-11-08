const jwt = require("jsonwebtoken");
const util = require("util");
const { db } = require("../models/index");
const dotenv = require("dotenv");
require('dotenv').config();
db.query = util.promisify(db.query);

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)   //토큰값 확인하기!
  const [tokenType, token] = authorization.split(" ");

  if (!token || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 서비스입니다.",
    });
    return;
  }
  console.log("미들웨어 Pass");

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      let users;
      const post = `SELECT * FROM user WHERE user_email = ?`;
      const results = await db.query(post, [decoded.user_email]); // 에러 날수도 있음.
      users = {
        user_id: results[0]["user_id"],
        user_email: results[0]["user_email"],
        user_nickname: results[0]["user_nickname"],
        user_gender: results[0]["user_gender"],
        user_age: results[0]["user_age"],
        user_image: results[0]["user_image"],
      };
      res.locals.user = users;
      console.log("로컬 유저는?", res.locals.user);
    } else {
      res.locals.user = undefined;
      console.log("토큰 없습니다.");
      console.log("로컬 유저는?", res.locals.user);
    }
  } catch (err) {
    res.status(401).send({ errorMessage: "로그인이 필요합니다" });
    return;
  }
  next();
};

const jwt = require("jsonwebtoken");
const util = require("util");
const { db } = require("../models/index");
const dotenv = require("dotenv");
require('dotenv').config();
db.query = util.promisify(db.query);

const authentication = async (req, res, next) => {
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
      const post = `SELECT * FROM user WHERE userEmail = ?`;
      const results = await db.query(post, [decoded.userEmail]); // 에러 날수도 있음.
      users = {
        userId: results[0]["userId"],
        userEmail: results[0]["userEmail"],
        userNickname: results[0]["userNickname"],
        userGender: results[0]["userGender"],
        userAge: results[0]["userAge"],
        userImage: results[0]["userImage"],
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
}
  module.exports  = {
    authentication
  }

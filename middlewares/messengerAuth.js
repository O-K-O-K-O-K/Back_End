const jwt = require("jsonwebtoken");
const util = require("util");
const { db } = require("../models/index");
const dotenv = require("dotenv");
require('dotenv').config();
db.query = util.promisify(db.query);

module.exports = async (req, res, next) => {
  try {
    console.log("두번째 auth",res.locals.user)
    const { recieverId,senderId } = req.params;
    console.log("auth", userId, senderId)
    console.log("auth22", res.locals.user.userId)
    console.log(senderId == res.locals.user.userId)
    if ((recieverId == res.locals.user.userId)||(senderId == res.locals.user.userId)) {
        console.log("사용자 인증 확인") 
    }else  {
        res.status(402).send({ errorMessage: "사용권한이 없습니다!" });
    }
  } catch (err) {
    res.status(401).send({ errorMessage: "로그인이 필요 합니다!" });
    return;
  }
  next();
};
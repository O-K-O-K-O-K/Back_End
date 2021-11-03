const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const uf = require("./userfunction.js");
const util = require("util");
const mysql = require("mysql");
const db_config = require("../models/index");
const db = db_config.init();
db_config.connect(db);
const dotenv = require("dotenv");
db.query = util.promisify(db.query);

// 로그인
router.post("/login", async (req, res) => {
  const { user_email, password, gender, age, image } = req.body;
  let users;
  const post = "SELECT * FROM user WHERE user_email = ?";
  const results = await db.query(post, [user_email]);
  users = results[0];
  if (users) {
    // 유저가 존재한다면? (이미 가입했다면)
    if (users.password === password) {
      const token = jwt.sign(
        {
          user_email: users.user_email,
          user_nickname: users.user_nickname,
          gender: users.gender,
          age: users.age,
          image: users.image,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      ); // 토큰에 user_email, nickname을 담아준다.
      // res.cookie("user", token);
      res.json({ token });
    } else {
      res.status(400).send({});
    }
  } else {
    // 유저가 없다면? (가입하지 않았다면)
    res.status(400).send({});
  }
});

//회원가입
router.post("/signUp", async (req, res) => {
  const { user_email, password,confirm_password, user_nickname, user_gender, user_age, user_image, dog_id } = req.body;
  if (!(await uf.emailExist(user_email))) {
    res.status(401).send({ result: "선생님, 이메일이 중복같은데요??" });
  } else if (!(await uf.nicknameExist(user_nickname))) {
    // 닉네임 중복 검사
    res.status(401).send({ result: "선생님, 닉네임이 중복같은데요??" });
  } else if (!uf.idCheck(user_email)) {
    // id 정규식 검사
    res.sendStatus(401);
  } else if (!uf.pwConfirm(password, confirm_password)) {
    // 비밀번호와 비밀번호 확인이 맞는지 검사
    res.sendStatus(401);
  } else if (!uf.pwLenCheck(password)) {
    // 비밀번호 최소길이 검사
    res.sendStatus(401);
  } else if (!uf.pw_idCheck(user_email, password)) {
    // 아이디가 비밀번호를 포함하는지 검사
  } else {
    const dopost = [user_email, password, user_nickname, user_gender, user_age, user_image, dog_id];
    const post =
      "INSERT INTO user (user_email, password, user_nickname, user_gender, user_age, user_image, dog_id) VALUES (?, ? , ?, ?, ?, ?, ?);";
    db.query(post, dopost, (error, results, fields) => {
      // db.query(쿼리문, 넣을 값, 콜백)
      if (error) {
        res.status(401).send(error);
        console.log(error);
      } else {
        console.log("누군가가 회원가입을 했습니다.");
        res.send({ results: "완료" });
      }
    });
  }
});

module.exports = router;

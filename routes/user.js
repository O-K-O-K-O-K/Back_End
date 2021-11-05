const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const setRounds = 10;
const router = express.Router();
const util = require("util");
// const db_config = require("../models/index");
// const db = db_config.init();
// db_config.connect(db);

const { db } = require("../models/index");

const dotenv = require("dotenv");
db.query = util.promisify(db.query);

//로그인
router.post("/login", async (req, res) => {
  const { user_email, password } = req.body;
  let users;
  const post = "SELECT * FROM user WHERE user_email = ?";
  const results = await db.query(post, [user_email]);
  users = results[0];

  if (users) {
    // 유저가 존재한다면? (이미 가입했다면)
    if (users.password === password) {
      const token = jwt.sign(
        {
          user_id: users.user_id,
          user_email: users.user_email,
          user_nickname: users.user_nickname,
          gender: users.user_gender,
          age: users.user_age,
          image: users.user_image,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }   //// 추후 1시간으로 변경 예정
      );
      res.json({ token });
    } else {
      res.status(400).send({result: "비밀번호를 확인해주세요." });
    }
  } else {
    // 유저가 없다면? (가입하지 않았다면)
    res.status(400).send({result: "이메일을 확인해주세요." });
  }
});

//회원가입
router.post("/signUp", async (req, res) => {
  const { user_email, password,confirm_password, user_nickname, user_gender, user_age, user_image} = req.body;  //confirm_password 확인하기!
  if (!await emailExist(user_email)) {
    res.status(401).send({ result: "이메일이 중복같은데요??" });
  } else if (!await nicknameExist(user_nickname)) {
    // 닉네임 중복 검사
    res.status(401).send({ result: "닉네임이 중복같은데요??" });
  } else if (!idCheck(user_email)) {
    // id 정규식 검사
    res.sendStatus(401);
  } else if (!pwConfirm(password, confirm_password)) {
    // 비밀번호와 비밀번호 확인이 맞는지 검사
    res.sendStatus(401);
  } else if (!pwLenCheck(password)) {
    // 비밀번호 최소길이 검사
    res.sendStatus(401);
  } else if (!pw_idCheck(user_email, password)) {
    // 아이디가 비밀번호를 포함하는지 검사
  } else {
    const dopost = [user_email, password, user_nickname, user_gender, user_age, user_image];
    const post =
      "INSERT INTO user (user_email, password, user_nickname, user_gender, user_age, user_image) VALUES (?, ? , ?, ?, ?, ?);";
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



function idCheck(id_give) {
  console.log(id_give);
  const reg_name =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규식표현
  if (reg_name.test(id_give) && id_give.length >= 3) {
    return true;
  }
  return false;
}

function pwConfirm(pw_give, pw2_give) {
  console.log(pw_give,pw2_give);
  if (pw_give === pw2_give) {
    return true;
  }
  return false;
}

function pwLenCheck(pw_give) {
  console.log(pw_give);
  if (pw_give.length >= 4) {
    return true;
  }
  return false;
}

function pw_idCheck(id_give, pw_give) {
  if (!id_give.includes(pw_give)) {
    return true;
  }
  return false;
}

function emailExist(user_email) {
  return new Promise((resolve, reject) => {
    const query = 'select user_email from user where user.user_email = ?';
    const params = [user_email];
    db.query(query, params, (error, results, fields) => {
      console.log(results);
      if (error) {
        // logger.error(`Msg: raise Error in checkValidationEmail => ${error}`);
        console.log(error)
        console.log(1);
        return resolve(false);

      }

      // 아무 값이 없기 때문에, 중복이 없다. (가능 하다는 얘기)
      if (results.length == 0) {
        console.log(2);
        return resolve(true);
      }

      // 존재하다면, 이메일 중복으로 인지
      console.log(3);
      resolve(false);
    });
  });
}

async function nicknameExist(nick_give) {
  console.log(nick_give);
  const post = "SELECT * FROM user WHERE user_nickname = ?;";
  const results = await db.query(post, [nick_give]);
  if (results.length) {
    // Boolean([])  true이다.
    return false;
  } else {
    return true;
  }
}



module.exports = router;

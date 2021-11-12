const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const setRounds = 10;
const router = express.Router();
const util = require("util");
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { db } = require("../models/index");
const dotenv = require("dotenv");
dotenv.config();
db.query = util.promisify(db.query);
const upload = require("../S3/s3");  // 여기



//로그인
router.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;
  let users;
  const post = `SELECT * FROM user WHERE userEmail = ?`;
  const results = await db.query(post, [userEmail]);
  users = results[0];
  const hash = results[0].password;

  if (users) {
    // 유저가 존재한다면? (이미 가입했다면)
    if (bcrypt.compareSync(password, hash)) {
      const token = jwt.sign(
        {
          userId: users.userId,
          userEmail: users.userEmail,
          userNickname: users.userNickname,
          gender: users.userGender,
          age: users.userAge,
          image: users.userImage,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" } 
      );
      // res.cookie('user', token);  쿠키!
      res.json({ token, user: users.userId });
      console.log("유저아이디:",users.userId)
    } else {
      res.status(400).send({result: "비밀번호를 확인해주세요." });
    }
  } else {
    // 유저가 없다면? (가입하지 않았다면)
    res.status(400).send({result: "이메일을 확인해주세요." });
  }
});

//회원가입  여기 미들웨어(upload.single("userImage)
router.post("/signUp", upload.single("userImage"), async (req, res) => {
  const { userEmail, password, confirmPassword, userNickname, userGender, userAge,userLocation} = req.body;
  const userImage = req.file.location;   //여기 따로 지정
  if (!await nicknameExist(userNickname)) {
    // 닉네임 중복 검사
    res.status(401).send({ result: "닉네임이 존재합니다." });
  } else if (!idCheck(userEmail)) {
    // id 정규식 검사
    res.sendStatus(402);
  } else if (!pwConfirm(password, confirmPassword)) {
    // 비밀번호와 비밀번호 확인이 맞는지 검사
    res.sendStatus(403);
  } else if (!pwLenCheck(password)) {
    // 비밀번호 최소길이 검사
    res.sendStatus(404);
  } else if (!pw_idCheck(userEmail, password)) {
    // 아이디가 비밀번호를 포함하는지 검사
    res.status(401).send({ result: "비밀번호 형식이 올바르지않습니다." });
  } else {
    const salt = await bcrypt.genSaltSync(setRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userParams = [userEmail, hashPassword, userNickname, userGender, userAge, userImage,userLocation];
    const post =
      "INSERT INTO user (userEmail, password, userNickname, userGender, userAge, userImage, userLocation) VALUES (?, ?, ? , ?, ?, ?, ?);";
    db.query(post, userParams, (error, results, fields) => {
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


//이메일 중복확인 
router.post("/checkDup", async  (req, res) => {
  const { userEmail} = req.body;
  if (!await emailExist(userEmail)) {
    res.status(401).send({ result: "이메일이 존재합니다." });
  } else {
    res.status(200).send({ result: "정상적인 이메일입니다."})
  }
});


function idCheck(idGive) {
  console.log(idGive);
  const reg_name =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규식표현 추후 프론트와 협의
  if (reg_name.test(idGive) && idGive.length >= 3) {
    return true;
  }
  return false;
}

function pwConfirm(pwGive, pw2Give) {
  console.log(pwGive,pw2Give);
  if (pwGive === pw2Give) {
    return true;
  }
  return false;
}

function pwLenCheck(pwGive) {
  console.log(pwGive);
  if (pwGive.length >= 4) {
    return true;
  }
  return false;
}

function pw_idCheck(idGive, pwGive) {
  if (!idGive.includes(pwGive)) {
    return true;
  }
  return false;
}

function emailExist(userEmail) {
  return new Promise((resolve, reject) => {
    const query = `select userEmail from user where user.userEmail = ?`;
    const params = [userEmail];
    db.query(query, params, (error, results, fields) => {
      console.log(results);
      if (error) {
        // logger.error(`Msg: raise Error in checkValidationEmail => ${error}`);
        console.log(error)
        return resolve(false);
      }

      // 아무 값이 없기 때문에, 중복이 없다. (가능 하다는 얘기)
      if (results.length == 0) {
        return resolve(true);
      }

      // 존재하다면, 이메일 중복으로 인지
      resolve(false);
    });
  });
}

async function nicknameExist(nickGive) {
  const post = `SELECT * FROM user WHERE userNickname = ?;`;
  const results = await db.query(post, [nickGive]);
  if (results.length) {
    // Boolean([])  true이다.
    return false;
  } else {
    return true;
  }
}


module.exports = router;

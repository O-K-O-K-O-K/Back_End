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

// 로그인
router.post("/login", async (req, res) => {
try{
  const { user_email, password } = req.body;
  const query =  `SELECT * FROM user WHERE user_email = ${user_email}`;
  const results = await db.query(query, [user_email], (error, rows, fields) => {
    if (error) {
      // logger.error(`Msg: raise Error in isMatchEmailToPwd => ${error}`);
      return res.status(400).json({
        success: false,
        errMessage: '400 에러 로그인중 오류가 발생 하였습니다!.'
      });
    }
    // query문의 결과가 1개 이상이면서 비밀번호가 일치할 때,
    if (rows.length >= 1 && bcrypt.compareSync(password, rows[0].password)) {
      return resolve({
        success: true,
        rows: rows[0],
        Message: '로그인이 성공적으로 되었습니다.'
      });
    }
    return resolve({ success: false });
  })
  if (!results.results) {
  return res.status(401).json({
    success: false,
    errMessage: '로그인 정보가 일치하지 않습니다.'
    });
  }
    // DB에서 nickname, email을 가져온다. 토큰에 넣기 위함.  ?????????????????????
    const user_nickname = data.rows.user_nickname;
    const email = data.rows.user_email;
    const user_id = data.rows.user_id;
    const hashed_password = data.rows.password;

    if (!bcrypt.compareSync(user_password, hashed_password)) {
      // logger.error('비밀번호가 일치하지 않습니다.');
      return res.status(401).json({
        success: false,
        errMessage: '비밀번호가 일치하지 않습니다.'
      });
    }

  // 토큰 생성
  const token = create_jwt_token(user_nickname, user_email);
  // logger.info('로그인에 성공했습니다.');
  res.status(201).json({
    success: true,
    token,
    user_email: user_email,
    user_nickname: user_nickname,
    user_id: user_id,
    Message: '로그인에 성공했습니다.'
  });
} catch (err) {
  logger.error('로그인 기능 중 에러가 발생: ', err);
  res.status(500).json({
    success: false,
    errMessage: '로그인 기능 중 에러가 발생하였습니다.'
  });
}
});

//JWT 토큰 생성
function create_jwt_token(user_nickname, user_email) {
return jwt.sign({ user_nickname, user_email }, process.env.SECRET_KEY, {
  expiresIn: '1h',    //리프레쉬 시간 24h -> 1h
});
}


// // 비밀번호 암호화(암호화)
// const salt = bcrypt.genSaltSync(setRounds);
// const hashedPassword = bcrypt.hashSync(password, salt);

// const userParams = [user_email, hashedPassword, user_nickname];
// const userQuery =
//   'INSERT INTO user(user_email, userPw, userNickname) VALUES(?,?,?)';

//   // 비밀번호 일치 여부 알려주는 함수
// function checkMatchingPassword(userPw, userPwCheck) {
//   if (userPw === userPwCheck) {
//     return true;
//   }
//   return false;
// }



























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
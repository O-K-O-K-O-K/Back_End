"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const setRounds = 10;
const { db } = require("../../models/index");


const loginUser = async (req, res) => {
    const { userEmail, password } = req.body;
    let users;
    const post = `SELECT * FROM user WHERE userEmail = ?`;
    const results = await db.query(post, [userEmail]);
    // console.log("results", results[0].userEmail);
    users = results[0];
    if (users) {
      // 유저가 존재한다면? (이미 가입했다면)
      const hash = results[0].password;
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
          { expiresIn: "144h" }
        );
        // res.cookie('user', token);  쿠키!
        res.json({ token, user: users.userId });
        console.log("유저아이디:", users.userId);
      } else {
        res.status(400).send({ result: "비밀번호를 확인해주세요." });
      }
    } else {
      // 유저가 없다면? (가입하지 않았다면)
      res.status(400).send({ result: "이메일을 확인해주세요." });
    }
};


const postUser = (req, res) => {
    console.log("회원가입 들어오니?")
    const { userEmail, password, confirmPassword, userNickname, userGender, userAge,userLocation} = req.body;
  
    // console.log("req.file", req.file)
    const userImage =   req.file.transforms[0].location; 
    // const userImage =   req.file.location;
    console.log("userImage", userImage)
  
    const salt =  bcrypt.genSaltSync(setRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userParams = [userEmail, hashPassword, userNickname, userGender, userAge, userImage,userLocation];
    const post =
      "INSERT INTO user (userEmail, password, userNickname, userGender, userAge, userImage, userLocation) VALUES (?, ?, ? , ?, ?, ?, ?);";
    db.query(post, userParams, (error, results, fields) => {
      // db.query(쿼리문, 넣을 값, 콜백)
      if (error) {
        console.log("저장", error)
        res.status(401).send(error);
        console.log(error);
      } else {
        console.log("누군가가 회원가입을 했습니다.");
        res.send({ results: "완료" });
        }
      });
};

const checkDup = async (req, res) => {
    const { userEmail } = req.body;
    if (idCheck(userEmail)) {
      if (!(await emailExist(userEmail))) {
        res.status(401).send({ result: "이메일이 존재합니다." });
      } else {
        res.status(200).send({ result: "정상적인 이메일입니다." });
      }
    }
};

//email 정규식 처리
function idCheck(idGive) {
  const reg_name =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (reg_name.test(idGive) && idGive.split("@")[0].length >= 3) {
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
        console.log(error);
        return resolve(false);
      }
      // 아무 값이 없기 때문에, 중복이 없다.2 (가능 하다는 얘기)
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


module.exports = {
    loginUser,
    postUser,
    checkDup,
};

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const { db } = require("../models/index");
const cors = require('cors');

//예외 처리 - 유저가 signUp은 하는대, dog 정보를 입력하지 않고 나가는 경우.
// 3번 user를 signUp를 했는데, 도그 정보 입력 안함
// 4번 user를 사인업 햇는데, 이 때 도그 정보 입력함
// 걱정은, 3번 user정보에 4번 도그 정보가 들어갈 우려가 있음. -> 체크 바람

// 기획 변경 의견 : 처음 회원가입을 할 때, user 정보만 받고, 로그인을 하고 나서, dog 정보를 기입하게 한다. 
//(kakao 로그인을 할 때도 더 편할 것 같다.왜냐하면 kakao로그인은 강아지 정보가 없기 때문에)

//강아지 정보 등록하기
router.post("/dogInfo", upload.single("dogImage"), auth, async (req, res, next) => {
  const userId =  res.locals.user.userId;
  console.log("auth 들어옴: ", userId)
  console.log("req.file ",req.file)

  try {
    console.log("req.body", req.body);
    const {
      dogGender,
      dogName,
      dogSize,
      dogBreed,
      dogAge,
      neutral,
      dogComment,
      // dogImage,
      // userId,
    } = req.body;
    console.log(dogGender, dogName)
    const dogImage = req.file.location;
    
    console.log("dogImage:", dogImage)

    const params = [
      dogGender,
      dogName,
      dogSize,
      dogBreed,
      dogAge,
      neutral,
      dogComment,
      dogImage,
      userId,
    ];

    console.log("정보들어",params);
    const query =
      "INSERT INTO dog(dogGender, dogName, dogSize, dogBreed, dogAge, neutral, dogComment, dogImage, userId) VALUES(?,?,?,?,?,?,?,?,?)";
    console.log("여기까지 오나 실험", query)

    await db.query(query, params, (error, rows, fields) => {
      console.log("여기 들어옴?",query)
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "db에 저장하기 실패",
        });
      }
      return res.status(201).json({
        success: true,
        msg: "db에 강아지 등록 성공",
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
});

// 마이 프로필에서 dog 정보 get 하는 것
router.get("/", auth, async (req, res) => {
  const userId =  res.locals.user.userId;

  try {
    const query = 
    `select dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId 
    from dog left join user on dog.userId = user.userId where dog.userId= "${userId}";`

    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        // logger.error('게시글 조회 중 발생한 DB관련 에러', error);
        return res.sendStatus(400);
      }
      // logger.info('게시글을 성공적으로 조회했습니다.');
      res.status(200).json({
        success: true,
        posts: rows,
      });
      console.log(rows);
    });
  } catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
});


// 강아지 정보 수정하기
router.patch('/', upload.single("dogImage"), auth, async (req, res) => {
  console.log("수정하기")
  const userId =  res.locals.user.userId;

  console.log("reqbody:", req.body)
  const {
    dogGender,
    dogName,
    dogSize,
    dogBreed,
    dogAge,
    neutral,
    dogComment,
  } = req.body;

  const dogImage = req.file.location;
  // console.log("이미지 타입:",typeof(dogImage));

  const escapeQuery = {
    dogGender : dogGender,
    dogName : dogName,
    dogSize : dogSize,
    dogBreed : dogBreed,
    dogAge : dogAge,
    neutral : neutral,
    dogComment : dogComment,
    dogImage : dogImage,
  };

  console.log(escapeQuery)
  const query = `UPDATE dog SET ? WHERE dog.userId = '${userId}'`;

  await db.query(query, escapeQuery, (error, rows, fields) => {
    if(error){
      return res.status(400).json({
        success: false,
        error,
        msg : "실패임",
      });
    } else{
      return res.status(200).json({
        success:true,
        dogs: rows,
      });
    }
  })
});



module.exports = router;

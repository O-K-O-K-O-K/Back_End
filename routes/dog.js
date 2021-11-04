const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const { db } = require("../models/index");

//예외 처리 - 유저가 signUp은 하는대, dog 정보를 입력하지 않고 나가는 경우.
// 3번 user를 signUp를 했는데, 도그 정보 입력 안함
// 4번 user를 사인업 햇는데, 이 때 도그 정보 입력함
// 걱정은, 3번 user정보에 4번 도그 정보가 들어갈 우려가 있음. -> 체크 바람

//강아지 정보 등록하기
router.post("/dog_info", upload.single("dog_image"), auth, async (req, res, next) => {
  // const user_id = 2; 
  const user_id =  res.locals.user.user_id;
  console.log("auth 들어옴: ", user_id)

  try {
    console.log("req.body", req.body);
    const {
      dog_gender,
      dog_name,
      dog_size,
      dog_breed,
      dog_age,
      neutral,
      dog_comment,
      // dog_image,
      // user_id,
    } = req.body;

    const dog_image = req.file.location;
    // const user_id = res.user.user_id; //-> 나중에 user 받아오면

    const params = [
      dog_gender,
      dog_name,
      dog_size,
      dog_breed,
      dog_age,
      neutral,
      dog_comment,
      dog_image,
      user_id,
    ];

    console.log(params);
    const query =
      "INSERT INTO dog(dog_gender, dog_name, dog_size, dog_breed, dog_age, neutral, dog_comment, dog_image,user_id) VALUES(?,?,?,?,?,?,?,?,?)";
    // console.log("여기까지 오나 실험", query)

    await db.query(query, params, (error, rows, fields) => {
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
      msg: "try 문에 들어가지 못함",
    });
  }
});

// 마이 프로필에서 dog 정보 get 하는 것
router.get("/:dog_id", async (req, res) => {
  const { dog_id } = req.params;

  try {
    const query = `select * from dog left join user on dog.dog_id = user.user_id where dog.dog_id= "${dog_id}";`

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


router.patch('/:dog_id', upload.single("dog_image"), async (req, res) => {
  const { dog_id } = req.params;
  const user_id = 1; // const user_id = req.user.user_id;

  console.log("reqbody:", req.body)
  const {
    dog_gender,
    dog_name,
    dog_size,
    dog_breed,
    dog_age,
    neutral,
    dog_comment,
  } = req.body;

  const dog_image = req.file.location;

  const escapeQuery = {
    dog_gender : dog_gender,
    dog_name : dog_name,
    dog_size : dog_size,
    dog_breed : dog_breed,
    dog_age : dog_age,
    neutral : neutral,
    dog_comment : dog_comment,
    dog_image : dog_image,
  };

  console.log(escapeQuery)
  const query = `UPDATE dog SET ? WHERE dog_id = ${dog_id} and user_id = '${user_id}'`;

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

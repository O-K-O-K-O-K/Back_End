const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");
const { db } = require("../models/index");
// const ctrl = require("../controllers/dog/dog.ctrl")

//강아지 정보 등록하기
router.post("/dogInfo", upload.single("dogImage"), auth, async (req, res, next) => {
    const userId = res.locals.user.userId;
      try {
        const {
          dogGender,
          dogName,
          dogSize,
          dogBreed,
          dogAge,
          neutral,
          dogComment
        } = req.body;
    
        // const dogImage = req.file.location;
        const dogImage = req.file.transforms[0].location;
    
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
        const query =
          "INSERT INTO dog(dogGender, dogName, dogSize, dogBreed, dogAge, neutral, dogComment, dogImage, userId) VALUES(?,?,?,?,?,?,?,?,?)";
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

// dog 사진 수정하기
// url: /dogs/changeImage
router.patch('/changeImage', upload.single("dogImage"), auth, async (req, res) => {
  const userId = res.locals.user.userId;

  const dogImage = req.file.transforms[0].location;

  console.log("dogImage", dogImage)

  const escapeQuery = {
    dogImage : dogImage
  }

  console.log("escapeQuery", escapeQuery)

  const userQuery = `UPDATE dog SET dogImage = "${dogImage}" WHERE dog.userId = "${userId}"`

  console.log("query ", userQuery)

  await db.query(userQuery, escapeQuery, async(err, user)=> {
    if(err){
      return res.status(400).json({
        msg: "강아지 사진 변경 실패"
      })
    }
    return res.status(200).json({
      msg: "강아지 사진 변경 성공",
      user
    })
  })

})

// 강아지 정보 수정하기
router.patch('/', auth, async (req, res) => {
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

  // const dogImage = req.file.location;
  // console.log("이미지 타입:",typeof(dogImage));

  const escapeQuery = {
    dogGender : dogGender,
    dogName : dogName,
    dogSize : dogSize,
    dogBreed : dogBreed,
    dogAge : dogAge,
    neutral : neutral,
    dogComment : dogComment,
    // dogImage : dogImage,
  };

  console.log(escapeQuery)

  const userQuery = `UPDATE dog 
  SET dogGender="${dogGender}", dogName="${dogName}", dogSize="${dogSize}", dogBreed="${dogBreed}", 
  dogAge = "${dogAge}", neutral="${neutral}", dogComment ="${dogComment}"
  WHERE dog.userId = '${userId}'`;

  console.log(userQuery)

  await db.query(userQuery, escapeQuery, async (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      msg: "dog 정보 수정 성공! 사진 제외",
      user,
    });
  });
});


module.exports = router;
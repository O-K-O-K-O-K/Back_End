const express = require("express");
const router = express.Router();

// const db_config = require("../models/index");
// const db = db_config.init();
// db_config.connect(db);

// const auth = require('../middlewares/auth');
const dotenv = require("dotenv");
dotenv.config();
const upload = require("../S3/s3");

const { db } = require("../models/index");

//강아지 정보 등록하기
router.post("/dog_info", upload.single("dog_image"), async (req, res, next) => {
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
      user_id,
    } = req.body;

    const dog_image = req.file.location;
    // const user_id = res.locals.user_id; -> 나중에 user 받아오면 

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

    console.log(params)
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
      msg: "걍 실패",
    });
  }
});


// router.get('/:dog_id', async(req,res)=> {

// })

module.exports = router;
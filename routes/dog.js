const express = require("express");
const router = express.Router();
const db_config = require("../models/index");
const db = db_config.init();
db_config.connect(db);
// const dotenv = require('dotenv');
// dotenv.config();

router.post("/dog", async (req, res, next) => {
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
      dog_image,
      user_id
    } = req.body;
    // const newDate = new Date();
    // const postTime = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");
    const params = [
      dog_gender,
      dog_name,
      dog_size,
      dog_breed,
      dog_age,
      neutral,
      dog_comment,
      dog_image,
      user_id
    ];
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

// 강아지 정보 조회하기
// router.get("/dog", function async(req, res, next) {
//     const query = 'select *, (select count(*) from comment where dog_id = dog.dogId) as  from dog ORDER BY dog_id DESC;';
// });

module.exports = router;

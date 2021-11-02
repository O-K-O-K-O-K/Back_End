// const express = require("express");
// const router = express.Router();
// const db_config = require("../models/index");
// const db = db_config.init();
// db_config.connect(db);
// // const dotenv = require('dotenv');
// // dotenv.config();

// router.post("/signUp", async (req, res, next) => {
//   try {
//     console.log("req.body", req.body);
//     let {
//       user_email,
//       password,
//       user_nickname,
//       user_gender,
//       user_age,
//       user_image
//     } = req.body;
 
//     const params = [
//       user_email,
//       password,
//       user_nickname,
//       user_gender,
//       user_age,
//       user_image,
//     ];
//     const query =
//       "INSERT INTO user(user_email,password,user_nickname,user_gender,user_age,user_image) VALUES(?,?,?,?,?,?)";
//     // console.log("여기까지 오나 실험", query)

//     await db.query(query, params, (error, rows, fields) => {
//       if (error) {
//         return res.status(400).json({
//           success: false,
//           msg: "db에 저장하기 실패",
//         });
//       }
//       return res.status(201).json({
//         success: true,
//         msg: "db에 user 등록 성공",
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       msg: "걍 실패",
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");

// 내가 쓴 글 조회하기, auth 뺌
// if 내가 쓴 글이 없으면 아무것도 안 보내고, else 있으면 다 보낸다.
router.get("/myPost/:userId", async (req, res) => {
  console.log("myPage 여기까지 옴");
  const { userId } = req.params;

  let existPost;
  const post = `SELECT * FROM post WHERE post.userId= "${userId}"`
  console.log(post)
  const results = await db.query(post);
  existPost = results[0];

  console.log("existpost:", existPost);

  //포스트가 없으면
  if (!existPost) {
    //강아지와 유저 정보를 보내준다.
    const query = `SELECT * FROM post WHERE post.userId= "${userId}"`;

    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        return res.status(200).json({
          success:false
        });
      }
      return res.status(200).json({
        success: true,
        posts: rows,
      });
    });
  } else {
    console.log("else문 들어옴")
    // 강아지, 유저, 유저가 쓴 글을 보내준다
    const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, 
    dog.neutral, dog.dogComment, dog.dogImage, post.postId, post.meetingDate, post.wishDesc, post.userId, post.locationCategory,
    user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation  
    FROM post
    JOIN dog
    ON post.userId = dog.userId
    JOIN user
    ON user.userId = dog.userId
    WHERE post.userId = "${userId}"`;

    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        return res.status(200).json({
          success:false
        });
      }
      return res.status(200).json({
        success: true,
        posts: rows,
      });
    });
  }
});

// 유저/강아지 정보 조회, auth 빼면 어떻게 할건지
router.get("/myInfo/:userId", async (req, res) => {
  const { userId } = req.params;

  const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
  user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation 
  FROM dog 
  LEFT JOIN user 
  ON dog.userId = user.userId 
  WHERE dog.userId= "${userId}"`;

  await db.query(query, (error, rows) => {
    if (error) {
      console.log(error);
      return res.status(200).json({
        success:false
      });
    }
    return res.status(200).json({
      success: true,
      posts: rows,
    });
  });
});

module.exports = router;
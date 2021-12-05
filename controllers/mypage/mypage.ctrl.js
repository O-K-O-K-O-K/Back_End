"use strict";
const { db } = require("../../models/index");

// if 내가 쓴 글이 없으면 아무것도 안 보내고, else 있으면 다 보낸다.
const getMyPagePost = async (req, res) => {
    const { userId } = req.params;  
    let existPost;
    const post = `SELECT * FROM post WHERE post.userId= "${userId}"`
    const results = await db.query(post);
    existPost = results[0];
  
    //포스트가 없으면
    if (!existPost) {
      //빈값 보냄
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
          return res.status(400).json({
            success:false
          });
        }
        return res.status(200).json({
          success: true,
          posts: rows,
        });
      });
    }
};

const getMyPageInfo = async (req, res) => {
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
};

module.exports = {
    getMyPagePost,
    getMyPageInfo
};

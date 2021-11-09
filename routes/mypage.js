const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../S3/s3");
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("../models/index");

// user_id만 주는 기능
// router.get("/giveUserId", auth, async (req, res) => {
//     const userId = res.locals.user.userId;

//     const userQuery = `select user.userId from user where user.userId= "${userId}"`;
//     await db.query(userQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         user,
//       });
//     });
// });

// 강아지 등록 여부
router.get("/dogExist", auth, async (req, res) => {
  const userId = res.locals.user.userId;

  const dog = `SELECT * FROM dog WHERE dog.userId ="${userId}"`;
  const results = await db.query(dog);
  console.log("results:", results);

  if (results.length) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// 내 정보 조회하기
router.get("/me", auth, async (req, res) => {
  try {
    const userId = res.locals.user.userId;

    const userQuery = `select user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation from user where user.userId= "${userId}"`;
    await db.query(userQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
});

// 내 정보 수정하기
router.patch("/me", upload.single("userImage"), auth, async (req, res) => {
  // null 값일 때, 강아지 원래 사진 보내주기

  try {
    const userId = res.locals.user.userId;
    console.log("req.body:", req.body);
    const { userNickname, userGender, userAge, userLocation} = req.body;

    const userImage = req.file.location;
    // console.log("이미지 타입:",typeof(userImage));

    const escapeQuery = {
      userNickname: userNickname,
      userGender: userGender,
      userAge: userAge,
      userLocation: userLocation,
      userImage: userImage,
    };

    console.log("여기: ", escapeQuery);

    const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

    await db.query(userQuery, escapeQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        msg: "user 정보 수정 성공!",
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
});

// 내가 쓴 글 조회하기 황유정
router.get("/myPage", async (req, res) => {
  console.log("myPage 여기까지 옴");
  const userId = res.locals.user.userId;

  let exist_post;
  const post = `SELECT * FROM post WHERE post.userId= "${userId}"`;
  const results = await db.query(post);
  exist_post = results[0];

  console.log("existpost:", exist_post);

  //포스트가 없으면
  if (!exist_post) {
    //강아지와 유저 정보를 보내준다.
    const query = `select dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
    user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation 
    from dog left join user on dog.userId = user.userId where dog.userId= "${userId}";`

    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        return res.sendStatus(400);
      }
      res.status(200).json({
        posts: rows,
      });
      console.log(rows);
    });
  } else {
    // 강아지, 유저, 유저가 쓴 글을 보내준다
    const query = `select dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, 
      dog.neutral, dog.dogComment, dog.dogImage, post.postId, post.meetingDate, post.wishDesc, post.userId,
      user.userId, user.userNickname, user.userGender, user.userAge, user.userImage, user.userLocation  
      from post
      join dog
      on post.userId = dog.userId
      join user
      on user.userId = dog.userId
      WHERE post.userId = "${userId}";`;

    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        return res.sendStatus(400);
      }
      res.status(200).json({
        posts: rows,
      });
      console.log("rows", rows);
    });
  }
});


// 내 정보 수정하기
// 먼저 이미지를 불러온 후, 수정하기
// router.patch("/me", upload.single("userImage"), auth, async (req, res) => {
//   try {
//     const userId = res.locals.user.userId;

//     const { userNickname, userGender, userAge, userImage } = req.body;

//     console.log("userImage", userImage); //userImage가 없으면, undefined로 뜬다.
//     console.log("이미지 타입:", typeof(userImage));

//     //
//     if (!userImage) {
//       //user의 이미지를 가져온다.
//       let i;
//       const userDb = `SELECT user.userImage FROM user WHERE user.userId= "${userId}"`;
//       const thisIsImage = await db.query(userDb);
//       i = thisIsImage[0];

//       console.log("이게 이미지다", i);

//       // res.status(200).json({i});
//     }
//     // else{
      
//     // }

//     // console.log("req.body:", req.body);
//     // const { userNickname, userGender, userAge} = req.body;
//    // const userImage = req.file.location;
//     // const userImage = thisIsImage;

//     const escapeQuery = {
//       userNickname: userNickname,
//       userGender: userGender,
//       userAge: userAge,
//       userImage: userImage,
//     };
//     // console.log("여기: ", escapeQuery);

//     const userQuery = `UPDATE user SET ? WHERE user.userId = '${userId}'`;

//     await db.query(userQuery, escapeQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         msg: "user 정보 수정 성공!",
//         user,
//       });
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//     });
//   }
// });

module.exports = router;

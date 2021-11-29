// "user strict";
// const { db } = require("../../models/index");


// const addDog = async (req, res) => {
//   const userId = res.locals.user.userId;
//   try {
//     const {
//       dogGender,
//       dogName,
//       dogSize,
//       dogBreed,
//       dogAge,
//       neutral,
//       dogComment
//     } = req.body;

//     const dogImage = req.file.location;

//     const params = [
//       dogGender,
//       dogName,
//       dogSize,
//       dogBreed,
//       dogAge,
//       neutral,
//       dogComment,
//       dogImage,
//       userId,
//     ];
//     const query =
//       "INSERT INTO dog(dogGender, dogName, dogSize, dogBreed, dogAge, neutral, dogComment, dogImage, userId) VALUES(?,?,?,?,?,?,?,?,?)";
//     await db.query(query, params, (error, rows, fields) => {
//       if (error) {
//         return res.status(400).json({
//           success: false,
//           msg: "db에 저장하기 실패",
//         });
//       }
//       return res.status(201).json({
//         success: true,
//         msg: "db에 강아지 등록 성공",
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       msg: "로그인 하세요",
//     });
//   }
// };

// const getDog = async (req, res) => {
//   const userId = res.locals.user.userId;

//   try {
//     const query = `select dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId 
//     from dog left join user on dog.userId = user.userId where dog.userId= "${userId}";`;

//     await db.query(query, (error, rows) => {
//       if (error) {
//         console.log(error);
//         return res.sendStatus(400);
//       }
//       res.status(200).json({
//         success: true,
//         posts: rows,
//       });
//       console.log(rows);
//     });
//   } catch (err) {
//     return res.sendStatus(500);
//   }
// };

// const updateDogPic = async (req, res) => {
//   const userId = res.locals.user.userId;
//   const dogImage = req.file.location;

//   const escapeQuery = {
//     dogImage: dogImage,
//   };

//   const userQuery = `UPDATE dog SET dogImage = "${dogImage}" WHERE dog.userId = "${userId}"`;
//   await db.query(userQuery, escapeQuery, async (err, user) => {
//     if (err) {
//       return res.status(400).json({
//         msg: "강아지 사진 변경 실패",
//       });
//     }
//     return res.status(200).json({
//       msg: "강아지 사진 변경 성공",
//       user,
//     });
//   });
// };

// const updateDogInfo = async (req, res) => {
//     const userId =  res.locals.user.userId;
//     const {
//       dogGender,
//       dogName,
//       dogSize,
//       dogBreed,
//       dogAge,
//       neutral,
//       dogComment,
//     } = req.body;

//     const escapeQuery = {
//       dogGender : dogGender,
//       dogName : dogName,
//       dogSize : dogSize,
//       dogBreed : dogBreed,
//       dogAge : dogAge,
//       neutral : neutral,
//       dogComment : dogComment,
//     };
  
//     const userQuery = `UPDATE dog 
//     SET dogGender="${dogGender}", dogName="${dogName}", dogSize="${dogSize}", dogBreed="${dogBreed}", 
//         dogAge = "${dogAge}", neutral="${neutral}", dogComment ="${dogComment}"
//     WHERE dog.userId = '${userId}'`;
  
//     await db.query(userQuery, escapeQuery, async (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         msg: "dog 정보 수정 성공! 사진 제외",
//         user,
//       });
//     });
//   };

// module.exports = {
//   addDog,
//   getDog,
//   updateDogPic,
//   updateDogInfo,
// };

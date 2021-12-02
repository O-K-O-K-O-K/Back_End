"user strict";
const { db } = require("../../models/index");


const getAllPosts = (req, res, next) => {
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    const query = `SELECT count(*) as count
      FROM post`
      db.query(query, (error, rows) => {
        if (error) {
          logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
            logger.info('게시글을 성공적으로 조회했습니다.');
        const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
        const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
        const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize); // NOTE: 현재 페이지의 페이지네이션 시작 번호.
        let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, 
        dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
        post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
        FROM post
        JOIN dog
        ON dog.userId=post.userId
        ORDER BY post.createdAt DESC 
        LIMIT ${skipSize},${contentSize}`
        db.query(query2, (error, results) => {
          if (error) {
            logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
          }
          if (pnEnd>pnTotal) pnEnd = pnTotal; 
          res.status(200).json({
            success: true,
            posts: getAllPostsData,
          })
      }); 
    });  
  }

  function getAllPostsData(results) {
      return {
        pageNum,
        pnStart,
        pnEnd,
        pnTotal,
        contents : results
      };
  }


// const putUpPosts = async (req, res) => {
//     console.log("write post 연결완료!")
//     const completed = 0;
//     const userId = res.locals.user.userId;
//     try {
//       const {meetingDate,wishDesc,locationCategory, dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName} = req.body;
//       console.log(meetingDate)
//       const params= [
//         meetingDate,
//         wishDesc,
//         completed,
//         locationCategory,
//         dogCount,
//         totalTime,
//         startLocationAddress,
//         endLocationAddress,
//         totalDistance,
//         routeColor,
//         routeName,
//         userId,
//       ];  
//       const query =
//       'INSERT INTO post (meetingDate,wishDesc,completed,locationCategory,dogCount,totalTime,startLocationAddress,endLocationAddress,totalDistance,routeColor,routeName, userId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
//         await db.query(query, params, (error, rows, fields) => {
//           console.log("row는",rows)
//           if (error) {
//             console.log(error)
//             // logger.error('게시글 저장 중 DB관련 에러가 발생 했습니다', error);
//             return res.status(400).json({
//               success: false,
//               errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
//             });
//           }
//           // logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
//           return res.status(201).json({
//             success: true,
//             Message: '게시글이 성공적으로 포스팅 되었습니다!.'
//           });
//         });
//       } catch (err) {
//         // logger.error('게시글 작성 중 에러가 발생 했습니다: ', err);
//         return res.status(500).json({
//           success: false,
//           errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
//         });     
//       }
//     }
// const showOlympicParkPosts = (req, res, next) => {
//     let where
//     console.log("get method 연결완료!")
//     const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
//     console.log(dogSize, dogGender, dogAge, locationCategory, completed)
//     const location = "올림픽공원"
//     try {
  
//       const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
//       post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
//       FROM post
//       JOIN dog
//       ON dog.userId=post.userId
//       where post.locationCategory ='${location}'
//       ORDER BY post.createdAt DESC ` 
//       console.log('query',query);
  
//       db.query(query, (error, rows) => {
//         if (error) {
//           console.log(error)
//           // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//           return res.sendStatus(400);
//         }
//         // logger.info('게시글을 성공적으로 조회했습니다.');
//         res.status(200).json({
//           success: true,
//           posts: rows,
//         });
//         console.log("rows는", rows)
//       });
  
//     } catch (err) {
//       // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500);
//     }
//   };
// const showBanpoParkPosts = (req, res, next) => {
//     let conditions = [];
//     let where
//     console.log("get method 연결완료!")
//     const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
//     console.log(dogSize, dogGender, dogAge, locationCategory, completed)
//     const location = "반포한강공원"
//     try {
  
//       const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
//       post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
//       FROM post
//       JOIN dog
//       ON dog.userId=post.userId
//       where post.locationCategory ='${location}'
//       ORDER BY post.createdAt DESC ` 
//       console.log('query', typeof query);
  
//       db.query(query, (error, rows) => {
//         if (error) {
//           console.log(error)
//           // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//           return res.sendStatus(400);
//         }
//         // logger.info('게시글을 성공적으로 조회했습니다.');
//         res.status(200).json({
//           success: true,
//           posts: rows,
//         });
//         console.log("rows는", rows)
//       });
  
//     } catch (err) {
//       // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500);
//     }
//   };
// const showSeoulForestPosts = (req, res, next) => {
//     let conditions = [];
//     let where
//     console.log("get method 연결완료!")
//     const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
//     console.log(dogSize, dogGender, dogAge, locationCategory, completed)
//     try {
  
//       const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
//       post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
//       FROM post
//       JOIN dog
//       ON dog.userId=post.userId 
//       where post.locationCategory ="서울숲"
//       ORDER BY post.createdAt DESC` 
//       console.log('query', typeof query);
  
//       db.query(query, (error, rows) => {
//         if (error) {
//           console.log(error)
//           // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//           return res.sendStatus(400);
//         }
//         res.status(200).json({
//           success: true,
//           posts: rows,    
//         });
//         console.log("rows는", rows)
//         // logger.info('게시글을 성공적으로 조회했습니다.');
//       });
  
//     } catch (err) {
//       // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500);
//     }
//   };
// const showAllPosts = (req, res, next) => {
//     let conditions = [];
//     let where
//     console.log("get method 연결완료!")
//     const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
//     console.log(dogSize, dogGender, dogAge, locationCategory, completed)
//     try {
  
//       const query = `SELECT
//       dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
//       post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
//       FROM post
//       JOIN dog
//       ON dog.userId=post.userId 
//       ORDER BY post.createdAt DESC` 
//       console.log('query', typeof query);
//       db.query(query, (error, rows) => {
//         if (error) {
//           console.log(error)
//           // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//           return res.sendStatus(400);
//         }
//         // logger.info('게시글을 성공적으로 조회했습니다.');
//         res.status(200).json({
//           success: true,
//           posts: rows,
//         });
//         console.log("rows는", rows)
//       });
  
//     } catch (err) {
//       // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500);
//     }
//   }
//   const showSpecificPage = (req, res, next) => {
//         const {postId} = req.params;
//         console.log("get method 연결완료!")
//         try {
//           const query = 
//           `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage,
//           post.userId, post.postId, post.meetingDate, post.wishDesc, post.locationCategory, post.dogCount, post.createdAt, post.completed, post.totalTime, post.startLocationAddress, post.endLocationAddress, post.totalDistance, post.routeColor, post.routeName,
//           user.userNickname, user.userGender, user.userAge, user.userImage,user.userId,
//           (SELECT
//             CASE
//             WHEN TIMESTAMPDIFF(MINUTE, post.createdAt,NOW())<=0 THEN '방금 전'
//             WHEN TIMESTAMPDIFF(MINUTE, post.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, post.createdAt, NOW()), '분 전')
//             WHEN TIMESTAMPDIFF(HOUR, post.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, post.createdAt, NOW()), '시간 전')
//             WHEN TIMESTAMPDIFF(DAY, post.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, post.createdAt, NOW()), '일 전')
//             ELSE post.createdAt
//             END) AS AGOTIME 
//           from post
//           join dog
//           on post.userId = dog.userId 
//           join user
//           on user.userId = dog.userId
//           WHERE post.postId ='${postId}'`;
//           db.query(query, (error, rows) => {
//             console.log("들어가니",rows)
//             if (error) {
//               console.log(error)
//               // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//               return res.sendStatus(400);
//             }
//             // logger.info('게시글을 성공적으로 조회했습니다.');
//             res.status(200).json({
//               success: true,
//               posts: rows[0],
//             });
//             console.log("rows는", rows)
//           });
//         } catch (err) {
//           // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//           return res.sendStatus(500);
//         }
//       }
// const sortPosts = (req, res, next) => {
//         let conditions = [];
//         let where
//         console.log("get method 연결완료!")
//         const {dogSize, dogGender, dogAge, locationCategory, completed} = req.body;
//         console.log(dogSize, dogGender, dogAge, locationCategory, completed)
      
//         //카테고리 필터 
//         if(dogSize !== 'undefined'){
//           conditions.push(`dogSize = '${dogSize}'`);
//         }
//         if(dogGender !== 'undefined'){
//           conditions.push(`dogGender = '${dogGender}'`);
//         }
//         if(dogAge !== 'undefined'){
//           conditions.push(`dogAge = '${dogAge}'`);
//         }
//         if(locationCategory !== 'undefined'){
//           conditions.push(`locationCategory = '${locationCategory}'`);
//         }
//         if(completed !== 'undefined'){
//           conditions.push(`completed = '${completed}'`);
//         }
//         where = conditions.join(' AND ' );
//         console.log('where', where);
      
//         try {
//           console.log(4)
//           const query = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
//           post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory  
//           FROM post
//           JOIN dog
//           ON dog.userId=post.userId
//           WHERE ` + where 
//           console.log('query', typeof query);
//           db.query(query, (error, rows) => {
//             if (error) {
//               console.log(error)
//               // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
//               return res.sendStatus(400);
//             }
//             res.status(200).json({
//               success: true,
//               posts: rows,
//             });
//             console.log("rows는", rows)
//             // logger.info('게시글을 성공적으로 조회했습니다.');
//           });
      
//         } catch (err) {
//           // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//           return res.sendStatus(500);
//         }
//       }
// const editPosts = async (req, res) => {
//         try{
//         const postId = req.params.postId;
//         const userId = res.locals.user.userId;
//         const {locationCategory, meetingDate, wishDesc, dogCount,startLocationAddress,endLocationAddress,completed,totalDistance,totalTime,routeColor,routeName} = req.body;
//         const escapeQuery = {
//           locationCategory: locationCategory,
//           meetingDate: meetingDate,
//           wishDesc: wishDesc,
//           dogCount:dogCount,
//           startLocationAddress:startLocationAddress,
//           endLocationAddress:endLocationAddress,
//           completed:completed,
//           totalDistance:totalDistance,
//           totalTime:totalTime,
//           totalDistance:totalDistance,
//           routeColor:routeColor,
//           routeName:routeName,
//           // coordinate:coordinate
//         };
//         const query = `UPDATE post SET ? WHERE postId = ${postId} and userId = '${userId}'`;
//         await db.query(query, escapeQuery, (error, rows, fields) => {
//           console.log(rows)
//           if (error) {
//             console.log(error)
//             // logger.error('게시글 수정 중 DB관련 에러가 발생했습니다', error);
//             return res.status(400).json({
//               success: false,
//               error,
//             });
//           } else {
//             console.log("rows",rows)
//             // logger.info('게시글을 성공적으로 수정하였습니다.');
//             return res.status(200).json({
//               success: true,
//               posts: rows,
//             });
//           }
//         });
//       } catch (err) {
//         // logger.error('게시물 수정하기 중 예상하지 못한 에러가 밣생 했습니다', err);
//         return res.sendStatus(500);
//       }
//       }
// const completePlans = async (req, res) => {
//         console.log("마감여부 접속 완료 ")
//         try {
//         const postId = req.params.postId;
//         const userEmail = res.locals.user.userEmail;
//         console.log("user_email",userEmail)
//         const userId = res.locals.user.userId;
//         const {completed} = req.body;
//         const escapeQuery = {
//           completed:completed
//         }
//         const query = `UPDATE post SET ? WHERE postId = ${postId} and userId = '${userId}'`;
//         await db.query(query, escapeQuery, (error,rows,fields) => {
//           if (error) {
//             // logger.error('마감 여부 설정 중 DB관련 에러가 발생했습니다', error);
//             return res.status(400).json({
//               success: false,
//               error,
//             });
//           } else {
//             // logger.info('마감 여부가 성공적으로 바뀌었습니다');
//             return res.status(200).json({
//               success: true,
//             })
//           }
//         })
//       } catch (err) {
//         // logger.error('마감 여부 설정 중 예상하지 못한 에러가 밣생 했습니다', err);
//         return res.sendStatus(500);
//       }
//       }
// const deletePost =  async (req, res) => {
//         const  postId  = req.params.postId;
//         const userId = res.locals.user.userId;
      
//         const query = `DELETE from post where postId = ${postId} and userId = '${userId}'`;
//         try {
//           await db.query(query, (error, rows, fields) => {
//             if (error) {
//               // logger.error('게시글 삭제 중 쿼리문 에러가 발생하였습니다. :', error);
//               return res.status(400).json({
//                 success: false,
//               });
//             }
//             // logger.info('게시글을 성공적으로 삭제하였습니다.');
//             res.status(200).json({
//               success: true,
//             });
//           });
//         } catch (err) {
//           res.status(500).json({ err: err });
//           // logger.error('게시글 조회 중 에러가 발생 했습니다: ', err);
//         }
//       }

  module.exports = {
    getAllPosts,
    putUpPosts,
    showOlympicParkPosts,
    showBanpoParkPosts, 
    showSeoulForestPosts,
    showAllPosts,
    showSpecificPage,
    sortPosts,
    editPosts,
    completePlans,
    deletePost

  }
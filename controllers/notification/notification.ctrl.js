// "user strict";
// const { db } = require("../../models/index");

// const showNotification =async(req, res) => {
//     try {
//       const receiverId = res.locals.user.userId
//       const query = `SELECT notification.notificationId, notification.senderId, notification.type, notification.senderNickname, notification.updatedAt as createdAt, notification.postId, user.userImage as senderImage, 
//       (SELECT
//         CASE
//         WHEN TIMESTAMPDIFF(MINUTE,notification.updatedAt,NOW())<=0 THEN '방금 전'
//         WHEN TIMESTAMPDIFF(MINUTE, notification.updatedAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, notification.updatedAt, NOW()), '분 전')
//         WHEN TIMESTAMPDIFF(HOUR, notification.updatedAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, notification.updatedAt, NOW()), '시간 전')
//         WHEN TIMESTAMPDIFF(DAY, notification.updatedAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, notification.updatedAt, NOW()), '일 전')
//         ELSE notification.updatedAt
//         END) AS AGOTIME 
//       FROM notification
//       JOIN user
//       ON user.userId = notification.senderId 
//       WHERE notification.receiverId = "${receiverId}
//       ORDER BY updatedAt DESC"`
//       console.log("query", query);
//       await db.query(query, (error, rows) => {
//         if (error) {
//           console.log(error)
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         return res.status(200).json({
//           success: true,
//           notification: rows,
//         });
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         msg: "로그인 하세용",
//       });
//     }
//   }


// const postChatNotification =  async (req,res,next) =>{
//     try {
//       const userId = res.locals.user.userId;
//       const {receiverId, postId} = req.params;
//       //postId를 req.body로 보내주실 수 있나?
//       //아니면 req.params로 가능하나?
//       const {type} = req.body;
//       const senderId = userId
//       const senderNickname = res.locals.user.userNickname;
//       console.log("userId는",senderId)
  
//       let existData;
//       const isExist = `SELECT * 
//       FROM notification 
//       WHERE notification.postId = "${postId}" 
//       AND notification.receiverId = "${receiverId}"`;
  
//       console.log("isExist", isExist);
  
//       const results = await db.query(isExist);
//       existData = results[0];
//       console.log("existData", existData);
  
//       //만약에 data가 존재하지 않는다면
//       if(!existData){
//         // const {receiverId}= req.params;
//         // const {type} = req.body;
//         // const senderId = res.locals.user.userId;
//         const data = {
//           senderNickname:senderNickname,
//           senderId: senderId,
//           type:type
//         }
//         const params = [
//             receiverId, 
//             senderId,
//             senderNickname,
//             type,
//             postId
//         ];
//         const query = 
//         `INSERT INTO notification(receiverId,senderId,senderNickname,type,postId) VALUES(?,?,?,?,?)`;
//         await db.query(query, params,(error,rows,fieclds) => {
//           console.log("row는",rows)
//             if (error) {
//               console.log(error)
//               // logger.error('쪽지 저장 중 DB관련 에러가 발생 했습니다', error);
//               return res.status(400).json({
//                 success: false,
//                 errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
//               });
//             }
//             // logger.info(`${senderNickname}님, 쪽지 등록이 완료되었습니다.`);
//             req.app.get('io').of(`/notification/${receiverId}`).emit('getNotification', data);
//             console.log('io')
//             // req.app.get('io').of('/notification').to(req.params.receiverId).emit('getNotification', {senderNickname, type});
//             // req.app.get('io').of('/notification').emit('getNotification',data);
            
//             // console.log("req.params", req.params.receiverId)
//             // console.log("req.app", req.app)
//             // console.log("data", data)
//             return res.status(201).json({
//               success: true,
//               Message: '성공적으로 보내졌습니다!.'
//             });
//         })
//         // res.send(오케이)
//         // console.log("ok",ok)
//       }
//       else{
//         //만약 데이터가 존재한다면
//         return res.status(402).send({
//           msg: "신청 버튼을 이미 누르셨습니다!",
//         });
//       }
//     } catch (err) {
//       // logger.error('쪽지 작성 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500).send({
//         msg: "로그인 하세요",
//       });;
//     }
//   }


// const postRequestNotification = async (req,res,next) =>{
//     try {
//       const {receiverId, postId} = req.params;
//       //postId를 req.body로 보내주실 수 있나?
//       //아니면 req.params로 가능하나?
//       const {type} = req.body;
//       const senderId = res.locals.user.userId;
//       const senderNickname = res.locals.user.userNickname;
//       console.log("userId는",senderId)
  
//       let existData;
//       const isExist = `SELECT * 
//       FROM notification 
//       WHERE notification.postId = "${postId}" 
//       AND notification.receiverId = "${receiverId}"`;
//       console.log("isExist", isExist);
  
//       const results = await db.query(isExist);
//       existData = results[0];
//       console.log("existData", existData);
  
//       //만약에 data가 존재하지 않는다면
//       if(!existData){
//         const data = {
//           senderNickname:senderNickname,
//           senderId: senderId,
//           type:type
//         }
//         const params = [
//             receiverId, 
//             senderId,
//             senderNickname,
//             type,
//             postId
//         ];
//         const query = 
//         `INSERT INTO notification(receiverId,senderId,senderNickname,type,postId) VALUES(?,?,?,?,?)`;
//         await db.query(query, params,(error,rows,fieclds) => {
//           console.log("row는",rows)
//             if (error) {
//               console.log(error)
//               // logger.error('쪽지 저장 중 DB관련 에러가 발생 했습니다', error);
//               return res.status(400).json({
//                 success: false,
//                 errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
//               });
//             }
//             // logger.info(`${senderNickname}님, 쪽지 등록이 완료되었습니다.`);
//             req.app.get('io').of(`/notification/${receiverId}`).emit('getNotification', data);
//             // req.app.get('io').of('/notification').to(req.params.receiverId).emit('getNotification', {senderNickname, type});
//             // req.app.get('io').of('/notification').emit('getNotification',data);
            
//             // console.log("req.params", req.params.receiverId)
//             // console.log("req.app", req.app)
//             // console.log("data", data)
//             return res.status(201).json({
//               success: true,
//               Message: '성공적으로 보내졌습니다!.'
//             });
//         })
//         // res.send(오케이)
//         // console.log("ok",ok)
//       }
//       else{
//         //만약 데이터가 존재한다면
//         return res.status(402).send({
//           msg: "신청 버튼을 이미 누르셨습니다!",
//         });
//       }
//     } catch (err) {
//       // logger.error('쪽지 작성 중 에러가 발생 했습니다: ', err);
//       return res.sendStatus(500).send({
//         msg: "로그인 하세요",
//       });;
//     }
//   }

//   module.exports = {
//     showNotification,
//     postChatNotification,
//     postRequestNotification,
//     deleteComments
//   }
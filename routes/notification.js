const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");


//알람 조회하기
//notification/:receiverId
router.get('/:receiverId', auth, async(req, res) => {
  try {
    const {receiverId}= req.params;
    const senderId = res.locals.user.userId

    const query = `SELECT *
    FROM notification
    JOIN user
    ON user.userId = "${senderId}"
    WHERE notification.receiverId = "${receiverId}"`

    // SELECT *, (select count(*) from notification where notification.receiverId = "17")as count FROM notification WHERE notification.receiverId = "17"

    console.log("query", query);

    await db.query(query, (error, rows) => {
      if (error) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        notification: rows,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세용",
    });
  }

})

//알림 총 개수 조회하기
//notification/:receiverId/countAlarm
// router.get("/:receiverId/countAlarm", async (req, res) => {
//   try {
//     const { receiverId } = req.params;

//     let alarmCount;
//     const alarmUser = `SELECT * FROM notification WHERE receiverId ="${receiverId}"`;
//     const results = await db.query(alarmUser);
//     alarmCount = results[0];
//     console.log("likeCount", likeCount);

//     if (alarmCount) {
//       let alarmNum;
//       const likeQuery = `SELECT COUNT(notificationId) as count FROM notification WHERE receiverId ="${receiverId}"`;
//       console.log("likeQuery", likeQuery)

//       const results = await db.query(likeQuery)
//       likeNum = results[0];  

//       await db.query(likeQuery, (error, rows) => {
//         if (error) {
//           console.log(error);
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         return res.status(200).send({
//           likeNum
//         });
//       });
//     } else {
//       let likeNum;
//       const likeQuery = `SELECT COUNT(dogPostId) as count FROM likes WHERE dogPostId ="${dogPostId}"`;
//       console.log("likeQuery", likeQuery)

//       const results = await db.query(likeQuery)
//       likeNum = results[0];  

//       await db.query(likeQuery, (error, rows) => {
//         if (error) {
//           console.log(error);
//           return res.status(400).json({
//             success: false,
//           });
//         }
//         return res.status(200).send({
//           likeNum
//         });
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({
//       msg: "관리자에게 문의하세요",
//     });
//   }
// });


// http://13.209.70.209/notification/:notificationId
router.delete("/:notificationId", auth, async (req, res) => {
  const userId = res.locals.user.userId;
  const { notificationId  } = req.params;
  const query = `DELETE from notification where notification.notificationId = '${notificationId}' and notification.receiverId = '${userId}' `;
  try {
    await db.query(query, (error, rows, fields) => {
      if (error) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
     res.status(500).json({ 
        success: false,
        msg: "로그인 하세요" 
    });
  }
});

//쪽지 알람
router.post('/:receiverId', auth, async (req,res,next) =>{
  console.log("쪽지 알람 들어감")
  try {
    const {receiverId}= req.params;
    const senderNickname =res.locals.user.userNickname
    const senderId = res.locals.user.userId
    // const socketId = res.locals.user.socketId

    console.log("userId는",senderId)
    const type = 1
    const data = {
      senderNickname:senderNickname,
      senderId: senderId,
      type:1
    }
    const params = [
        receiverId, 
        senderId,
        senderNickname,
        type
    ];
    const query = 
    `INSERT INTO notification(receiverId,senderId,senderNickname,type) VALUES(?,?,?,?)`;
    await db.query(query, params,(error,rows,fields) => {
      console.log("row는",rows)
        if (error) {
          console.log(error)
          // logger.error('쪽지 저장 중 DB관련 에러가 발생 했습니다', error);
          return res.status(400).json({
            success: false,
            errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
          });
        }
        // logger.info(`${senderNickname}님, 쪽지 등록이 완료되었습니다.`);
        req.app.get('io').of(`/notification/${receiverId}`).emit('getNotification', data);

        // req.app.get('io').of('/notification').to(req.params.receiverId).emit('getNotification', {senderNickname, type});
        // req.app.get('io').of('/notification').emit('getNotification',data);
        
        console.log("req.params", req.params.receiverId)
        console.log("req.app", req.app)
        console.log("data", data)
        return res.status(201).json({
          success: true,
          Message: '쪽지가 성공적으로 보내졌습니다!.'
        });
    })
    res.send(오케이)
    console.log("ok",ok)
  } catch (err) {
    // logger.error('쪽지 작성 중 에러가 발생 했습니다: ', err);
    return res.sendStatus(500);
  }
})




module.exports = router;
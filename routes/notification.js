const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");

//알람 조회하기
router.get('/', auth, async(req, res) => {
  try {
    const receiverId = res.locals.user.userId
    const query = `SELECT notification.notificationId, notification.senderId, notification.type, notification.senderNickname, notification.updatedAt as createdAt, user.userImage as senderImage,
    (SELECT
      CASE
      WHEN TIMESTAMPDIFF(MINUTE,notification.updatedAt,NOW())<=0 THEN '방금 전'
      WHEN TIMESTAMPDIFF(MINUTE, notification.updatedAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, notification.updatedAt, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR, notification.updatedAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, notification.updatedAt, NOW()), '시간 전')
      WHEN TIMESTAMPDIFF(DAY, notification.updatedAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, notification.updatedAt, NOW()), '일 전')
      ELSE notification.updatedAt
      END) AS AGOTIME
    FROM notification
    JOIN user
    ON user.userId = notification.senderId
    WHERE notification.receiverId = "${receiverId}"
    ORDER BY notification.updatedAt DESC`
    console.log("query", query);
    await db.query(query, (error, rows) => {
      if (error) {
        console.log(error)
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


// 쪽지,산책신청 알람
// 403 에러가 뜨면 이미 누른 거로 모달 창 띄워주세요
router.post('/:receiverId', auth, async (req,res,next) =>{
  try {
    const {receiverId} = req.params;
    const {type,postId} = req.body;
    const senderId = res.locals.user.userId;
    const senderNickname = res.locals.user.userNickname;
    console.log("userId는",senderId)

    let existData;
    const isExist = `SELECT * 
    FROM notification 
    WHERE notification.postId = "${postId}" 
    AND notification.senderId = "${senderId}"`;
    console.log("isExist", isExist);

    const results = await db.query(isExist);
    existData = results[0];
    console.log("existData", existData);

    //만약에 data가 존재하지 않는다면
    if(!existData){
      const data = {
        senderNickname:senderNickname,
        senderId: senderId,
        type:type
      }
      const params = [
          receiverId, 
          senderId,
          senderNickname,
          type,
          postId
      ];
      const query = 
      `INSERT INTO notification(receiverId,senderId,senderNickname,type,postId) VALUES(?,?,?,?,?)`;
      await db.query(query, params,(error,rows,fieclds) => {
        console.log("row는",rows)
          if (error) {
            console.log(error)
            // logger.error('쪽지 저장 중 DB관련 에러가 발생 했습니다', error);
            return res.status(400).json({
              success: false,
              errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
            });
          }
          req.app.get('io').of(`/notification/${receiverId}`).emit('getNotification', data);
          return res.status(201).json({
            success: true,
            Message: '성공적으로 보내졌습니다!.'
          });
      })
    }
    else{
      //만약 데이터가 존재한다면
      return res.status(403).send({
        msg: "신청 버튼을 이미 누르셨습니다!",
      });
    }
  } catch (err) {
    return res.sendStatus(500).send({
      msg: "로그인 하세요",
    });;
  }
})


//수락여부 +소켓
router.patch("/:notificationId/:senderId", auth, async (req, res) => {
  try{
  const {notificationId,senderId} = req.params
  const {type,postId} = req.body; //수락하면 type3 // 거절하면 type 4

  const changeReceiverId = senderId;
  const changeSenderId = res.locals.user.userId;


  const senderNickname = res.locals.user.userNickname;
  const data = {
    senderNickname:senderNickname,
    senderId:changeSenderId,
    type:type
  }
  const escapeQuery = {
    type:type,
    senderId:changeSenderId,
    receiverId:changeReceiverId,
    senderNickname:senderNickname
  };
  const query = `UPDATE notification SET ? WHERE notificationId = '${notificationId}' and notification.receiverId = '${changeSenderId}'`;
  await db.query(query, escapeQuery, (error, rows, fields) => {
    console.log(rows)
    if (error) {
      console.log(error)
      // logger.error('산책 수락 결정 중 DB관련 에러가 발생했습니다', error);
      return res.status(400).json({
        success: false,
        error,
      });
    } else {
      // req.app.get('io').of(`/notification/${changeReceiverId}`).emit('getNotification', data);
      // console.log("data",data)
      // console.log("rows",rows)
      // logger.info('산책 수락 결정을 성공적으로 마쳤습니다.');
      return res.status(200).json({
        success: true,
        posts: rows,
      });
    }
  });
} catch (err) {
  // logger.error('산책 수락 결정 중 예상하지 못한 에러가 밣생 했습니다', err);
  return res.sendStatus(500);
}
});

//notification/deleteAlarm
router.delete("/:notificationId", auth, async (req, res) => {
  const userId = res.locals.user.userId;
  const { notificationId } = req.params;
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



module.exports = router;

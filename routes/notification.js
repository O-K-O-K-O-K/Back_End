const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");
const ctrl = require("../controllers/notification/notification.ctrl")


//알람 조회하기 //receiverNickname 보내기
    //알람 조회하기
router.get('/', auth, ctrl.showNotification)


//쪽지 알람 
// 쪽지,산책신청 알람
// 402 에러가 뜨면 이미 누른 거로 모달 창 띄워주세요
router.post('/:postId/:receiverId', auth, ctrl.postChatNotification)

// 쪽지,산책신청 알람
// 402 에러가 뜨면 이미 누른 거로 모달 창 띄워주세요
router.post('/:postId/:receiverId', auth, ctrl.postRequestNotification)

//수락여부 +소켓 
router.patch("/:notificationId/:senderId",auth, async (req, res) => {
  console.log("수락여부 + 소켓")
  try{
    const {notificationId,senderId} = req.params
    const {type,postId} = req.body; //수락하면 type3 // 거절하면 type 4
  console.log(type, postId)
  const changeReceiverId = senderId;
  const changeSenderId = res.locals.user.userId;
  const senderNickname = res.locals.user.userNickname;
    let acceptanceCount;
    const count =`SELECT COUNT(*) as count FROM notification WHERE notification.postId ="${postId}" and notification.type =3`;
    const acceptance = await db.query(count);
    acceptanceCount = acceptance[0].count
    console.log("1", acceptanceCount) //2

    const dogCount = `SELECT post.dogCount FROM post WHERE postId ="${postId}"`
    const maxDog = await db.query(dogCount)
    const maxDogNumber = maxDog[0].dogCount
    console.log("2",maxDogNumber) //2

    if (acceptanceCount > maxDogNumber) { //오류 넘버 정확히 확인 할 것!
      console.log( " 제한 인원을 넘었습니다!")
      return  res.status(401).json({
        success: false,
      })
    } else  {
      const data = {
        senderNickname:senderNickname,
        senderId:changeSenderId,
        type:type
      }
      console.log(data)
      const escapeQuery = {
        type:type,
        senderId:changeSenderId,
        receiverId:changeReceiverId,
        senderNickname:senderNickname
      };
      console.log("escape",escapeQuery)
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
          req.app.get('io').of(`/notification/${changeReceiverId}`).emit('getNotification', data);
          console.log("산책 수락을 결정을 성공적으로 마쳤습니다")
          // logger.info('산책 수락 결정을 성공적으로 마쳤습니다.');
          return res.status(200).json({
            success: true,
            posts: rows,
          });
        }
      });
    }
  } catch (err) {
  // logger.error('산책 수락 결정 중 예상하지 못한 에러가 밣생 했습니다', err);
  return res.sendStatus(500);}
});

//강아지 수가 마감되면, 아예 신청 못하도록 막아버리기

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

//리뷰 알람도, 소켓!처럼!!!
//로그인을 했을때, 메인페이지에 왔을때!
//현재 시간이 - 산책 다녀왔던 시기보다 크면, 리뷰 알람이 뜨도록! 보내주도록!
module.exports = router;
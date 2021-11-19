const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");
// const logger = require("../src/config/logger")


//쪽지 알람
router.post('/:receiverId', auth, async (req,res,next) =>{
  console.log("쪽지 알람 들어감")
  try {
    const {receiverId}= req.params;
    const senderNickname =res.locals.user.userNickname
    const senderId = res.locals.user.userId
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
        req.app.get('io').of('/notification').emit('getNotification', data);

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
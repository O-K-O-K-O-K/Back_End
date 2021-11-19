const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");
// const logger = require("../src/config/logger")

//보낸 쪽지함
router.get('/outbox', auth, async(req, res, next) => {
  try { 
    const userId= res.locals.user.userId;
    console.log(userId)
    const query = `SELECT 
    chat.chatId, chat.message, chat.createdAt, chat.senderId,chat.receiverId, user.userNickname as receiverNickname, user.userImage as receiverImage 
    from chat 
    join user
    on user.userId = chat.receiverId
    WHERE (chat.chatId, ${userId}) NOT IN (select deleteChat.chatId, deleteChat.userId from deleteChat) AND chat.senderId = ${userId} ORDER BY createdAt DESC`;
    db.query(query, (error,rows) => {
        if (error) {
            console.log(error)
            // logger.error('쪽지 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
        }
        // logger.info('쪽지를 성공적으로 조회했습니다.');
        res.status(200).json ({
            success: true,
            message:rows,
        })
        console.log("쪽지 들어가니",rows)
     })
    }catch (err) {
      // logger.error('쪽지 조회 중 예상치 못한 에러가 발생 했습니다: ', err);
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
}
})

//받은 쪽지함
router.get('/inbox',auth, async(req, res, next) => {
  try { 
  const userId= res.locals.user.userId;
  console.log(userId)
  const query = 
  `SELECT chat.senderNickname, chat.chatId, chat.message, chat.createdAt, user.userImage  as senderImage, chat.senderId, chat.receiverId
  from chat 
  join user
  on user.userId = chat.senderId
  WHERE ((chat.chatId, ${userId}) NOT IN (select deleteChat.chatId, deleteChat.userId from deleteChat)) AND chat.receiverId = ${userId} ORDER BY createdAt DESC`;
  db.query(query, (error,rows) => {
    console.log(query)
    if (error) {
      console.log(error)
      // logger.error('쪽지 조회 중 DB관련 에러가 발생했습니다', error);
      return res.sendStatus(400);
    }
    // logger.info('쪽지를 성공적으로 조회했습니다.');
    res.status(200).json ({
      success: true,
      message:rows,
    })
    console.log("쪽지 들어가니",rows)
  })
  }catch (err) {
    // logger.error('쪽지 조회 중 예상치 못한 에러가 발생 했습니다: ', err);
    return res.sendStatus(500);
  }
})

//쪽지 보내기 
router.post('/:receiverId', auth, async (req,res,next) =>{
  try {
    const {receiverId}= req.params;
    const senderNickname =res.locals.user.userNickname
    const senderId = res.locals.user.userId
    console.log("userId는",senderId)
    const {message} = req.body;
    const params = [
      senderNickname,
      message,
      senderId,
      receiverId
    ];
    const query = 
    `INSERT INTO chat(senderNickname,message,senderId,receiverId) VALUES(?,?,?,?)`;
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
        return res.status(201).json({
          success: true,
          Message: '쪽지가 성공적으로 보내졌습니다!.'
        });
    })
    res.send(오케이)
  } catch (err) {
    // logger.error('쪽지 작성 중 에러가 발생 했습니다: ', err);
    return res.sendStatus(500);
  }
})



//상세대화창 
router.get('/:chatId', auth, async(req, res, next) => {
  try { 
    const {chatId}= req.params;
    const query = `SELECT * from chat where chatId = ${chatId} ORDER BY chat.createdAt DESC`;
  db.query(query, (error,rows) => {
    if (error) {
      console.log(error)
      // logger.error('쪽지 조회 중 DB관련 에러가 발생했습니다', error);
      return res.sendStatus(400);
    }
    // logger.info('쪽지를 성공적으로 조회했습니다.');
    res.status(200).json ({
      success: true,
      message:rows,
    })
    console.log("쪽지",rows)
  })
  }catch (err) {
    // logger.error('쪽지 조회 중 예상치 못한 에러가 발생 했습니다: ', err);
    return res.sendStatus(500);
  }
})

//메세지 삭제
router.post('/:receiverId/:senderId/:chatId', auth, async(req, res, next) => {
  try {
    const {chatId,receiverId,senderId}= req.params;
    console.log(chatId,receiverId)
    const userId = res.locals.user.userId
    console.log(userId)
    const params = [
      chatId,
      receiverId,
      senderId,
      userId
    ];
    const query = 
    `INSERT INTO deleteChat (chatId,receiverId,senderId,userId) VALUES(?,?,?,?)`;
    await db.query(query, params,(error,rows,fields) => {
      console.log("row는",rows)
        if (error) {
          console.log(error)
          // logger.error('삭제된 쪽지를 저장 중 DB관련 에러가 발생 했습니다', error);
          return res.status(400).json({
            success: false,
            errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
          });
        }
        // logger.info(`삭제된 쪽지 등록이 완료되었습니다.`);
        return res.status(201).json({
          success: true,
          Message: '게시글이 성공적으로 포스팅 되었습니다!.'
        });
    })
    res.send(오케이)
  } catch (err) {
    // logger.error('삭제된 쪽지 작성 중 에러가 발생 했습니다: ', err);
    return res.sendStatus(500);
  }
})


module.exports = router;
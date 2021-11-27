"user strict";
const { db } = require("../models/index");
const sendMessages = async (req,res,next) =>{
    try {
      const {receiverId}= req.params;
      const senderNickname =res.locals.user.userNickname
      const senderId = res.locals.user.userId
      console.log("userId는",senderId)
      const {message} = req.body;
      const data = {
        senderNickname:senderNickname,
        type:1
      }
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
      req.app.get('io').to(req.params.receiverId).emit('sendNotifcation',data);
      res.send(오케이)
    } catch (err) {
      // logger.error('쪽지 작성 중 에러가 발생 했습니다: ', err);
      return res.sendStatus(500);
    }
  }
const showOutbox = async(req, res, next) => {
    try { 
      const userId= res.locals.user.userId;
      const senderImage = res.locals.user.userImage;
      console.log(userId)
      const query = `SELECT 
      chat.chatId, chat.message, chat.createdAt, chat.senderId, chat.receiverId, user.userNickname as receiverNickname, user.userImage as receiverImage, 
      (SELECT
        CASE
        WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt,NOW())<=0 THEN '방금 전'
        WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()), '분 전')
        WHEN TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()), '시간 전')
        WHEN TIMESTAMPDIFF(DAY, chat.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, chat.createdAt, NOW()), '일 전')
        ELSE chat.createdAt
        END) AS AGOTIME 
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
  }
const showInbox =async(req, res, next) => {
    try { 
    const userId= res.locals.user.userId;
    const senderImage = res.locals.user.userImage;
    console.log(userId)
    const query = 
    `SELECT chat.senderNickname, chat.chatId, chat.message, chat.createdAt, user.userImage  as senderImage, chat.senderId, chat.receiverId,
    (SELECT
      CASE
      WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt,NOW())<=0 THEN '방금 전'
      WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()), '분 전')
      WHEN TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()), '시간 전')
      WHEN TIMESTAMPDIFF(DAY, chat.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, chat.createdAt, NOW()), '일 전')
      ELSE chat.createdAt
      END) AS AGOTIME 
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
  }
const showDetailmessges = async(req, res, next) => {
    try { 
      const {chatId}= req.params;
      const userId = res.locals.user.userId;
      const query = `SELECT chat.chatId, chat.receiverId, chat.senderId, chat.senderNickname, chat.message,
      user.userImage as senderImage,
      (SELECT
        CASE
        WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt,NOW())<=0 THEN '방금 전'
        WHEN TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, chat.createdAt, NOW()), '분 전')
        WHEN TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, chat.createdAt, NOW()), '시간 전')
        WHEN TIMESTAMPDIFF(DAY, chat.createdAt, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(Day, chat.createdAt, NOW()), '일 전')
        ELSE chat.createdAt
        END) AS AGOTIME 
      from chat
      join user
      on user.userId = chat.senderId
      where chatId = ${chatId} ORDER BY chat.createdAt DESC`;
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
  }
const deleteMessages =async(req, res, next) => {
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
  }
  module.exports = {
    sendMessages,
    showOutbox,
    showInbox,
    showDetailmessges,
    deleteMessages
  }
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require("../models/index");

//보낸쪽지함
router.get('/outbox', auth, async(req, res, next) => {
  try { 
    const userId= res.locals.user.userId;
    const query = `SELECT message, createdAt, user.userNickname
    from chat 
    join user
    on user.userId = chat.receiverId
    where senderId = ${userId} ORDER BY createdAt DESC`;
  db.query(query, (error,rows) => {
    if (error) {
      console.log(error)
      return res.sendStatus(400);
    }
    res.status(200).json ({
      success: true,
      message:rows,
    })
    console.log("메세지 들어가니",rows)
  })
  }catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
})

//받은 쪽지함
router.get('/inbox',auth, async(req, res, next) => {
  try { 
  const userId= res.locals.user.userId;
  const query = 
  `SELECT senderNickname, message, createdAt from chat where receiverId = ${userId} ORDER BY createdAt DESC`;
  db.query(query, (error,rows) => {
    if (error) {
      console.log(error)
      return res.sendStatus(400);
    }
    res.status(200).json ({
      success: true,
      message:rows,
    })
    console.log("메세지 들어가니",rows)
  })
  }catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
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
          // logger.error(`Msg: raise Error in createPost => ${error}`);
          return res.status(400).json({
            success: false,
            errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
          });
        }
        return res.status(201).json({
          success: true,
          Message: '게시글이 성공적으로 포스팅 되었습니다!.'
        });
    })
    res.send(ok)
  } catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
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
      return res.sendStatus(400);
    }
    res.status(200).json ({
      success: true,
      message:rows,
    })
    console.log("메세지 들어가니",rows)
  })
  }catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
})


module.exports = router;
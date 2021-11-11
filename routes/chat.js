const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth'); 
const { db } = require("../models/index");


//make room
router.post('/room',async (req, res, next) => {
  try {
    const params=[]
    const query = `INSERT INTO room VALUES()`
    await db.query(query,params, (error,rows,fields) => {
      console.log(rows)
      if (error) {
        console.log(error)
        return res.status(400).json({
          success: false,
          errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
        });
      }
      return res.status(201).json({
        success: true,
        Message: 'roomId가 성공적으로 저장 되었습니다!.'
      });
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom',newRoom);
    res.redirect(`/room/${newRoom.roomId}`)
  } catch (err) {
    // logger.error('게시글 작성 중 발생한 에러: ', err);
    console.error(error);
    next(error);
  }
});

router.get('/room/:roomId', async(req, res, next) => {
  const {roomId} = req.params;
  try { const query = `SELECT chat.message, chat.createdAt, chat.userNickname from chat where chat.roomId = ${roomId} order by createdAt DESC`;
  db.query(query, (error,rows) => {
    const io = req.app.get('io')
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
  }catch (error) {
    return next(error);
  }
})

router.post('/room/:roomId/chat', async (req,res,next) =>{
  try {
    const {roomId} = req.params;
    console.log(roomId)
    // const userNickname = res.locals.user.userNickname;
    const userNickname ="엘리"
    const userId =1
    const {message} = req.body;
    const params = [
      roomId,
      userNickname,
      message,
      userId
    ];
    const query = 
    `INSERT INTO chat(roomId,userNickname,message,userId) VALUES(?,?,?,?)`;
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
    req.app.get('io').of('/chat').Router(req.params.id).emit('chat',chat);
    res.send(ok)
  } catch (error) {
    console.error(error);
    next(error)
  }
})

//소켓아이오 넣어야 함!



//
// router.post('/room/:roomId/post',async(req,res,next) => {
//   try {
//     const userNickname = res.locals.user.userNickname;
//     const chat = 
//   } 
// })

//new conversation
// router.post("/", async (req, res) => {
//     try {
//         const userId = res.locals.user.userId;
//         const userNickname = res.locals.user.userNickname;
//         const chatBoxId = 1
//         //쳇박스의 아이디를 고유로 주는 방법은?
//         const {message} = req.body; 
//         const params = [
//             userId,
//             userNickname,
//             message,
//             chatBoxId
//         ];
//         const query =
//         `INSERT INTO chat (userId,userNickname, message, chatBoxId) VALUES(?,?,?,?)`;
//         await db.query(query, params, (error, rows, fields) => {
//             console.log("row는",rows)
//             if (error) {
//               console.log(error)
//               return res.status(400).json({
//                 success: false,
//                 errMessage: '400 에러 저장중 오류가 발생 하였습니다!.'
//               });
//             }
//             return res.status(201).json({
//               success: true,
//               Message: '대화가 성공적으로 저장 되었습니다!.'
//             });
//           });

//     }catch(err) {
//         return res.status(500).json({
//             success: false,
//             errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
//           });   
//     }
// //chatBox의 id 가 계속 변경 될까? 변경 된다면 망...
// })

// router.get("/:chatBoxId", (req,res) => {
//     try {
//         const {chatBoxId} = req.params; 
//         // const userId = res.locals.user.userId;
//         const query =
//         `SELECT chat.message, chat.userNickname, chat.createdAt from chat WHERE chat.chatBoxId = ${chatBoxId}`; //해당유저의 메세지만 불러오는 문제가 발생? 상대의 메세지는 어찌 불러옴?
//         //해당 유저 닉네임을 어떻게 다 가지고 올까?
//        db.query(query, (error, rows) => {
//       if (error) {
//         console.log(error)
//         return res.sendStatus(400);
//       }
//       res.status(200).json({
//         success: true,
//         posts: rows, //수정할 필요 있음!
//       });
//       console.log("rows는", rows)
//     });
//   } catch (err) {
//     return res.sendStatus(500);
//   }
// });
// //관건은 쳇박스의 동알한 값! (코멘트처럼 부모 ID를 주는 방법?) 영상에서는 그래서 conversation table을 만들어서
// //conversation ID 의 값에 생긴 대화들을 불러오구나!
// module.exports = router;

module.exports = router;
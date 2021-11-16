const express = require('express');
const router = express.Router();
const messengerAuth = require('../middlewares/messengerAuth'); 
const auth = require('../middlewares/auth');
const { db } = require("../models/index");


//대화창 만들기 //   //receiverNickname 받는방법 프론트에 물어보기!
router.post('/',auth,async (req, res, next) => {
  try {
    const senderNickname = res.locals.user.userNickname;
    //receiverNickname 받는방법 있을까?
    const receiverNickname ="엘리엇"
    const params=[
      senderNickname,
      receiverNickname 
    ]
    const query = `INSERT INTO room (senderNickname,receiverNickname) VALUES(?,?)`
    await db.query(query,params, (error,rows,fields) => {
      console.log(rows)
      if (error) {
        console.log(error)
        return res.status(400).json({
          success: false,
          errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
        });
      } //유저가 어떻게 들어가냐?
      //상대 유저를 어떻게 찾냐?

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

//상세대화창 //roomId만!! 그리고 messengerAuth 지나가게 하려면, /:userId/:senderId/
router.get('/:roomId', auth, async(req, res, next) => {
  const {roomId} = req.params;
  console.log("roomId는",roomId)
  try { const query = `SELECT * from chat where chat.roomId = ${roomId} ORDER BY chat.createdAt DESC`;
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

//전체 대화 리스트 //OKAY
router.get('/',auth, async(req, res, next) => {
  const {userNickname} = res.locals.user;
  try { 
  const query = 
  `SELECT senderNickname, receiverNickname, roomId
  from room
  where (senderNickname = '${userNickname}' OR receiverNickname = '${userNickname}')
  ORDER BY room.createdAt DESC`;
  //룸에 닉네임이랑, 아이디 들어가야 하나??
  db.query(query, (error,rows) => {
    // const io = req.app.get('io')
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

//쪽지 보내기 
router.post('/:userId/:senderId/:roomId', auth, messengerAuth, async (req,res,next) =>{
  try {
    const {roomId}= req.params;
    // const receiverId= req.params.userId;
    const receiverId=1
    console.log(roomId)
    // const userNickname = res.locals.user.userNickname;
    const senderNickname =res.locals.user.userNickname
    const senderId = res.locals.user.userId
    console.log("userId는",senderId)
    const {message} = req.body;
    const params = [
      roomId,
      senderNickname,
      message,
      senderId,
      receiverId
    ];
    const query = 
    `INSERT INTO chat(roomId,senderNickname,message,senderId,receiverId) VALUES(?,?,?,?,?)`;
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
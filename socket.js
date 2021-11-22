const SocketIO = require('socket.io')
const jwtAuth = require('socketio-jwt-auth');
const dotenv = require("dotenv");
const { db } = require('./models');
const app = require('./app');
const { default: axios } = require('axios');
require('dotenv').config();
// const io = require('socket.io')(4000,{
//     cors:{
//         origin:"http://localhost:4000",
//     },
// });
module.exports = (server) => {
    const io = SocketIO(server, {path:'/socket.io'})
    app.set('io',io); //라우터에서 io객체를 쓸수 있게 저장 (req.app.get('io')로 접근 가능)
    const room = io.of('/room');
    const chat = io.of('/chat');

//test
io.on('connection', (socket) =>{
    console.log('connected')
})

// using middleware
io.use(jwtAuth.authenticate({
  secret: process.env.SECRET_KEY,    // required, used to verify the token's signature
  algorithm: 'HS256'        // optional, default to be HS256
}, function(payload, done) {
  // done is a callback, you can use it as follows
  const query = `SELECT * FROM user WHERE userId = ?`;
  db.query(query, (err,user) => {
  if (err) {
      // return error
    return done(err);}
      if (!user) {
        // return fail with an error message
        return done(null, false, 'user does not exist');}
        // return success with a user info
        return done(null, user);
    });
}))

room.on('connection', (socket) => {
    //connected
    console.log('room namespace connected');
    socket.on("disconneced", ()  => {
      console.log('room namespace disconnected')
    });
    });

chat.on('connection', (socket) => {
        //connected
    console.log('chat namespace connected');
    const req = socket.request;
    const {headers :{referer}} = req;
    const roomId = referer.split('/')[referer.split('/').length -1].replace(/\?.+/,'');
    socket.join(roomId);
    socket.to(roomId).emit('join', {
        user:'system',
        chat: `입장하였습니다` //나중에 Id  받아오자 일단 구현만! ${} 사용!
    });

    socket.on("disconneced", ()  => {
    console.log('chat namespace disconnected')
    socket.leave(roomId)
    });
    });
    //유저가 0일시 방 제거 (생략가능)
    socket.leave(roomId);
    const currentRoom = socket.adapter.rooms[roomId];
    const userCount = currentRoom ? currentRoom.length : 0;
    if(userCount === 0) {
        axios.delete(`http://localhost:3000/room/${roomId}`)  //배포 주소로 변경 해야함!
        .then(() =>{
            console.log('제거 요청 성공')
        }) 
        .catch((error) =>{
            console.log(error)
        }) 
    }else {
        socket.io(roomId).emit('exit',{
            user:'system',
            chat: `상대 유저가 퇴장 하였습니다` //유저 이름 변환 필요 ${} 사용!
        })
    }

// let users =[];

// const addUser = (userId, socektId) => {
//     !users.some(user => user.userId === userId) &&
//     users.push({userId,socketId})
// };

// const removeUser =  (socketId) =>{
//     users =users.filter(user => user.socketId !==socketId)
// }

// const getUsers = (userId) => {
//     return users.find(user => user.userId === userId)
// };

// io.on("connection", (socket) => {
//     //connected
//     console.log('a user connected')
//     //take userId and socketId from user
//     socket.on("addUser", userId => {
//         addUser(userId,socket.Id)
//         io.emit("getUsers",users)
//     })

//     //send and get message
//     socket.on("sendMessage", ({senderId,receiverId,text})=>{
//         const user = getUsers(receiverId);
//         io.to(user.socketId).emit("getMessage",{
//             senderId, 
//             text
//         })
//     })
//     //잘보자 변수!

//     //disconnected
//     socket.on("disconnect", () =>{
//         console.log("a user disconneced")
//         removeUser(socket.Id)
//         io.emit("getUsers",users)
//     })
// })
}
//userId를 받았나, userNickname을 받았나 체크 할 것!
//강의 다시 보면서 변수 확인 할 것! 특히 이 페이지에 있는것
//어떻게 수정할 것인가 생각해보기!  
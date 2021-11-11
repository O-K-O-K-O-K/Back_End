const SocketIO = require('socket.io')
const jwtAuth = require('socketio-jwt-auth');
const dotenv = require("dotenv");
const { db } = require('./models');
const app = require('./app');
require('dotenv').config();
// const io = require('socket.io')(3000,{
//     cors:{
//         origin:"http://localhost:3000",
//     },
// });
module.exports = (server) => {
    const io = SocketIO(server, {path:'/socket.io'})
    app.set('io',io); //라우터에서 io객체를 쓸수 있게 저장 (req.app.get('io')로 접근 가능)
    const room = io.of('/room');
    const chat = io.of('/chat');

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


let users =[];

const addUser = (userId, socektId) => {
    !users.some(user => user.userId === userId) &&
    users.push({userId,socketId})
};

const removeUser =  (socketId) =>{
    users =users.filter(user => user.socketId !==socketId)
}

const getUsers = (userId) => {
    return users.find(user => user.userId === userId)
};

io.on("connection", (socket) => {
    //connected
    console.log('a user connected')
    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId,socket.Id)
        io.emit("getUsers",users)
    })

    //send and get message
    socket.on("sendMessage", ({senderId,receiverId,text})=>{
        const user = getUsers(receiverId);
        io.to(user.socketId).emit("getMessage",{
            senderId, 
            text
        })
    })
    //잘보자 변수!

    //disconnected
    socket.on("disconnect", () =>{
        console.log("a user disconneced")
        removeUser(socket.Id)
        io.emit("getUsers",users)
    })
})
}
//userId를 받았나, userNickname을 받았나 체크 할 것!
//강의 다시 보면서 변수 확인 할 것! 특히 이 페이지에 있는것
//어떻게 수정할 것인가 생각해보기!  
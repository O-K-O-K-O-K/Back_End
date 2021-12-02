const SocketIO = require("socket.io");
// const jwtAuth = require('socketio-jwt-auth');
// const dotenv = require("dotenv");
// const { db } = require('./models');
const app = require("./app");
const { default: axios } = require("axios");
require("dotenv").config();

module.exports = (server, app) => {
  const io = SocketIO(server, {
    cors: {
      origin: "*",
    },
    path: "/socket.io",
  });
  app.set("io", io); //라우터 에서 io객체를 쓸수 있게 저장 (req.app.get('io')로 접근 가능)


  const notification = io.of(`/notification`);
  notification.on("connect", (socket) => {
    console.log("접속완료");
  });

  let users = [];

  const addNewUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  notification.on("connect", (socket) => {
    socket.on("postUser", (userId) => {
      addNewUser(userId, socket.id);
    });
    
    socket.on(
      "sendNotification",
      ({ senderName, senderUsername, receiverName, type }) => {
        console.log("!!!", senderName, senderUsername, receiverName, type);
        const receiver = getUser(receiverName);
        console.log("receiver: ", receiver);
        notification.emit("getNotification", {
          senderName,
          senderUsername,
          type,
        });
      }
    );
  });
};
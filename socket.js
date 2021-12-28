const SocketIO = require("socket.io");
require("dotenv").config();

module.exports = (server, app) => {
    const io = SocketIO(server, {
        cors: {
            origin: '*',
        },
        path: '/socket.io',
    })
    app.set('io', io) //라우터 에서 io객체를 쓸수 있게 저장 (req.app.get('io')로 접근 가능)

    const notification = io.of(`/notification`)
    notification.on('connect', (socket) => {
        console.log('접속완료')
    })

    let users = []

    const addNewUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId })
    }

    const getUser = (userId) => {
        return users.find((user) => user.userId === userId)
    }

    notification.on('connect', (socket) => {
        socket.on('postUser', (userId) => {
            addNewUser(userId, socket.id)
        })

        socket.on(
            'sendNotification',
            ({ senderName, senderUsername, receiverName, type }) => {
                console.log(
                    '!!!',
                    senderName,
                    senderUsername,
                    receiverName,
                    type
                )
                const receiver = getUser(receiverName)
                console.log('receiver: ', receiver)
                notification.emit('getNotification', {
                    senderName,
                    senderUsername,
                    type,
                })
            }
        )
    })
}
//내일 협력사 오시면, socket 때문에 어제 서버가 터저 급하게 서버를 복구했고, web socket 없앰

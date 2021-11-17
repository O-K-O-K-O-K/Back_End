// const SocketIO = require('socket.io');
// const app = require('./app');

// module.exports = (server, app) => {
//     const io = SocketIO(server, {path: '/socket.io'});
//     app.set('io', io);
//     // io.on('connection', (socket) => {
//     //     const req = socket.request;
//         // const{headers : {referer}} = req;
//     // })
// }

// io.on('connection', (socket) =>{
//     console.log('connected')
// })
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); 
const ctrl = require("../controllers/chat/chat.ctrl")
// const logger = require("../src/config/logger")

//쪽지 보내기 
router.post('/:receiverId', auth, ctrl.sendMessages)
//보낸 쪽지함 조회
router.get('/outbox', auth, ctrl.showOutbox )
//받은 쪽지함 조회 
router.get('/inbox',auth, ctrl.showInbox )
//상세 쪽지 조회 
router.get('/:chatId', auth, ctrl.showDetailmessges)
//쪽지 삭제
router.post('/:receiverId/:senderId/:chatId', auth, ctrl.deleteMessages)

module.exports = router;
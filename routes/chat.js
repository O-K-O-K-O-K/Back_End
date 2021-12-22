const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrl = require("../controllers/chat/chat.ctrl")

//쪽지 보내기 
router.post('/:receiverId', auth, ctrl.sendMessages)
//보낸 쪽지함
router.get('/outbox', auth, ctrl.getOutbox)
//받은 쪽지함
router.get('/inbox',auth, ctrl.getInbox)
//상세대화창 
router.get('/:chatId', auth, ctrl.getDetailMessages)
//메세지 삭제
router.post('/:receiverId/:senderId/:chatId', auth, ctrl.deleteMessages)


module.exports = router;
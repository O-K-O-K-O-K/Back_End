const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrl = require("../controllers/notification/notification.ctrl");

//알람 조회하기
router.get('/', auth, ctrl.getNotification)
// 쪽지,산책신청 알람
// 403 에러가 뜨면 이미 누른 거로 모달 창 띄워주세요
router.post('/:receiverId', auth, ctrl.postNotification)
//수락여부 +소켓
router.patch("/:notificationId/:senderId", auth, ctrl.acceptNotification);
//notification/deleteAlarm
router.delete("/:notificationId", auth, ctrl.deleteNotification);

module.exports = router;
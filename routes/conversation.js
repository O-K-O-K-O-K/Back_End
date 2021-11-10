const router = require("express").Router();
const { db } = require("../models/index");

//new conversation
router.post("/", auth, (req,res => {
    const userId = res.locals.user.userId;
    const userNickname = res.locals.users.userNickname;
    //받는 사람의 유저 아이디 혹은 userNickname을 알야야함 (theOtherId, theOtherNickname)
    const newMessage = new Message(req.body)

    try {
        const {message} = req.body;
        const saveMessage = await 
        const params = [
            
        ]
    }catch(err) {
        res.status(500).json(err)
    }

}))

module.exports = router;
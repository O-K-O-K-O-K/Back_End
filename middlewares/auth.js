const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  const { authorization } = req.headers;
  const [Bearer, token] = authorization.split(' ');
  if (token == 'undefined') {
    return res.status(401).json({});
  }
  try {
    // 로그인된 유저
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_email = decoded.user_email;
    const user_id = await User.findOne({
      where: { user_email },
    });
    res.locals.user = user.user_id;
    next();
  } catch (err) {
    next(err);
  }
};
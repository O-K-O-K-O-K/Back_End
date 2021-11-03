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
    const email = decoded.email;
    const user = await User.findOne({
      where: { email },
    });
    res.locals.user = user.id;
    next();
  } catch (err) {
    next(err);
  }
};
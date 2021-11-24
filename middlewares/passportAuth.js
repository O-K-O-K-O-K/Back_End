const passport = require("passport");

//토큰이 없이 들어오면 빠꾸 --- 사유 : 회원 탈퇴-아에 접근하면 안됨, 게시글 작성-아에 접근하면 안됨, 좋아요 등등
exports.logInOnly = (req, res, next) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate("jwt", (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError) {
        console.error("passportError:", passportError);
        return res.send({ message: passportError });
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
      res.locals.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    console.error(error);
    return res.send({ message: error });
  }
};
// 토큰이 없어도 들어와짐 // 하지만 토큰으로 정보를 가져오는 부분은 안보여줌.(대문 == following user의 게시글 목록)
exports.logInBoth = (req, res, next) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate("jwt", (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError) {
        console.error("passportError:", passportError);
        return res.send({ message: passportError });
      }
      if (!user) {
        return next();
      }
      res.locals.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    console.error(error);
    return res.send({ message: error });
  }
  // authenticate -> strategy -> serialize -> deserialize
};

exports.logInNot = (req, res, next) => {
  try {
    passport.authenticate("jwt", (Error, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError) {
        console.error("passportError:", passportError);
        return res.send({ message: Error });
      }

      // 유저 데이터 없을 경우
      if (!user) {
        return next();
      } else {
        const message = encodeURIComponent(
          "로그인 한 유저는 사용 할 수 없는 기능입니다."
        );
        res.redirect(
          `http://localhost:3000//?error=${message}`
        );
      }
    })(req, res, next);
  } catch (error) {
    console.error(error);
    return res.send({ message: error });
  }
};

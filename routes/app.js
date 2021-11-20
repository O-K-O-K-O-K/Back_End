
//모듈
const createError = require("http-errors");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const morgan = require("morgan");
// const logger = require("./src/config/logger")



//cors
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};


//라우팅
const swaggerFile = require("./swagger-output");
const dogsRouter = require("./routes/dog");
const detailRouter = require("./routes/detail");
const infoRouter = require("./routes/userInfo");
const usersRouter = require("./routes/user");
const dogstaRouter = require("./routes/dogsta");
const pagesRouter = require("./routes/mypage");
const chatRouter = require("./routes/chat");
const likeRouter = require("./routes/dogstaLike");
const notificationRouter = require("./routes/notification");
// const accessLogStream = require('./src/config/log');
const commentRouter = require("./routes/comment");

//앱세팅
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
require("dotenv").config();
app.use(morgan('dev')); //정규님이 하신것
app.use(morgan("tiny", {stream : accessLogStream }))  //콘솔에 출력하기 위한 용도 //스트림은 데이터가 다니는 통로 //dev는 지정 가능 (Tokens)
// app.use(compression());
// app.set('views', path.join(__dirname, 'views'));

//미들웨어
app.use("/dogs", dogsRouter);
app.use("/posts", detailRouter);
app.use("/users", infoRouter);
app.use("/users", usersRouter);
app.use("/dogsta", dogstaRouter);
app.use("/mypage", pagesRouter);
app.use("/chat", chatRouter);
app.use("/likes", likeRouter);
app.use("/notification", notificationRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/comment", commentRouter);

app.use((req,res,next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status =  404;
  logger.info('hello');
  logger.error(error.message);
  next(error);
});

app.get("/", (_, res) => res.render("home"));





module.exports = app;

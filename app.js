const createError = require('http-errors');
const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const path = require('path');
// const authMiddleware = require("./middlewares/auth");
// app.use(logger('dev'));
// const socketIo = require("socket.io")
// const logger = require('morgan');

const cors = require('cors');
const corsOptions = {
  origin: "*",
  // methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  // preflightContinue: false,
  credentials: true,
  // optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.set('views', path.join(__dirname, 'views'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

require('dotenv').config();

// app.use(compression());

const dogsRouter = require("./routes/dog");
const detailRouter = require("./routes/detail");
const infoRouter = require("./routes/userInfo");
const usersRouter = require("./routes/user");
const dogstaRouter = require("./routes/dogsta");
const pagesRouter = require("./routes/mypage");
const chatRouter = require("./routes/chat");
const likeRouter = require("./routes/dogstaLike");
const notificationRouter = require("./routes/notification");
const commentRouter = require("./routes/comment");


app.use("/dogs", dogsRouter); // 유정
app.use("/posts", detailRouter); // 선희님
app.use("/users", infoRouter); // 유정
app.use("/users", usersRouter); // 정규님
app.use("/dogsta", dogstaRouter); // 유정
app.use("/mypage", pagesRouter); // 유정
app.use("/chat", chatRouter); // 선희님
app.use("/likes", likeRouter); // 유정
app.use("/notification", notificationRouter); //선희님
app.use("/comment", commentRouter); //선희님
app.get("/",(_,res) => res.render("home"));

const auth = require('./middlewares/auth');
//swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

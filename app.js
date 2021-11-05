const createError = require('http-errors');
const express = require('express');
// const logger = require('morgan');
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const path = require('path');
// const authMiddleware = require("./middlewares/auth")
// app.use(logger('dev'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

require('dotenv').config();

// app.use(compression());

// app.set('views', path.join(__dirname, 'views'));

const dogsRouter = require('./routes/dog');
const detailRouter = require('./routes/detail');
const pagesRouter = require('./routes/mypage');
const usersRouter = require('./routes/user');

app.use('/dogs', dogsRouter);
app.use('/posts', detailRouter);
app.use('/users', pagesRouter);
app.use('/users', usersRouter);

const cors = require('cors');
const auth = require('./middlewares/auth');
const corsOptions = {
  //cors 설정
  origin: '*', // 전체 허용
  // methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  // preflightContinue: false,
  credentials: true,
  // 'Access-Control-Allow-Origin': '*',
  // optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));


//swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
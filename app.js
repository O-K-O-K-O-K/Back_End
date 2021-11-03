const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser =require('body-parser')
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

<<<<<<< HEAD
// app.use(logger('dev'));
=======

app.use(logger('dev'));

>>>>>>> tak

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
=======

>>>>>>> tak

require('dotenv').config();
// app.use(compression());

<<<<<<< HEAD
=======

>>>>>>> tak
// const dogsRouter = require('./routes/dog');
// const detailRouter = require('./routes/detail');
// const mainRouter = require('./routes/main');
// const pagesRouter = require('./routes/mypage');
const usersRouter = require('./routes/user');

// app.use('/dogs', dogsRouter);
// app.use('/posts', detailRouter);
// app.use('/posts', mainRouter);
<<<<<<< HEAD
// app.use('/users', usersRouter);
=======
app.use('/users', usersRouter);
>>>>>>> tak

const cors = require('cors');
const corsOptions = {
  //cors 설정
  origin: '*', // 전체 허용
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

//swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

<<<<<<< HEAD
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


=======
>>>>>>> tak
// catch 404 and forward to error handler
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
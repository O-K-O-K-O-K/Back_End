const winston = require('winston') //로그 관리를 위한 설치 모듈
const winstonDaily = require('winston-daily-rotate-file'); //로그파일 일자별로 생성


const {createLogger, format, transports} = require('winston');

const logger =  createLogger ({
    level :'info',
    format : format.json(), //로그 형식 활용법이 다양하므로, 공식 문서 참고!
    transports: [
        new transports.File({filename: 'conbined.log'}),
        new transports.File({filename: 'error.log', level: 'error'})
    ],
});

if (process.env.Node_ENV !== 'production') {
    logger.add(new transports.Console({format: format.simple()}))
}


module.exports = logger;


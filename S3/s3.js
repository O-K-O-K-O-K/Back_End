// AWS SDK는 위의 말처럼 AWS가 만들어놓은 도구들의 집합
const AWS = require("aws-sdk");
// 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어
const multer = require("multer");
// 이미지 업로드 시 S3에 업로드 하도록 만들어주는 모듈
const multerS3 = require('multer-s3-transform');
// 큰 사이즈의 이미지를 작게 리사이징 가능하고, 업로드 속도를 빠르게 할 수 있게 도와주는 모듈
const sharp = require("sharp"); 

// AWS의 내 아이디의 S3 버킷을 이용하기 위해, 액세스 키와 비밀키 그리고 region을 적었다. (환경변수로)
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.region,
});

// 확장자에 대해서 고민하기

// 이부분을 통해 multer와 multer-S3로 파일을 S3 내가 설정한 bucket에 업로드를 시키고 
// 업로드 된 파일의 저장경로(URL)을 sendPost를 통해 response 의 데이터에 넣어주게 되는것이 아닐까?
// 클라이언트에서 이미지를 업로드하고, 서버로 페이로드에 폼데이터를 담아 보내면, 유저의 AWS S3 버킷에 업로드한 파일(객체)를 저장합니다. 이렇게 저장된 이미지의 메타데이터를 req.file로 받을 수 있습니다.
// req.file은 객체이며, 이 객체의 속성 중, S3 버킷에 저장된 이미지 파일의 경로(이미지 주소)가 req.files.location이라는 키로 전달됩니다.
// 이 경로를 DB에 저장하고, 서버는 이 이미지 주소를 응답하면, Front-End에서 이 이미지를 핸들링할 수 있게 됩니다.
const storage = multerS3({
  s3: s3,
  bucket: 'doggy-project-bucket',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  shouldTransform: true,
  transforms: [
    {
      id: "resized",
      key: function (req, file, cb) {
        try {
          const fileType = file.mimetype.split("/")[0] != "image";
          if (fileType) {
            return cb(new Error("Only images are allowed"));
          }
          let ex = file.originalname.split(".");
          cb(
            null,
            "img" +
              Date.now() +
              parseInt(Math.random() * (99 - 10) + 10) +
              "." +
              // 확장자 없이 올림
              ex[ex.length - 1]
          );
        } catch {
          console.log("multer image upload error")
          return cb(new Error("multer image upload error"));
        }
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(300,300).rotate());
      },
    },
  ],
  acl: "public-read-write",
});

module.exports = multer({
  storage:storage
});
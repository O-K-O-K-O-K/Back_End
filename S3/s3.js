const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEYID, 
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.region
}); //AWS오ㅏ 연결 해주ㄴ 것?

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "doggy-project-bucket",
      acl: 'public-read-write',
      key: function (req, file, cb) {
        const extension = path.extname(file.originalname); //이 부분ㅣ 이해 안감
        cb(null, Date.now().toString() + extension);
      },
    }),
  });
  
module.exports = upload;
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
// const cors = require('cors');

require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEYID, 
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.region
});

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "doggy-project-bucket",
      // access control list : 접근 permission 어디까지 하냐
      acl: 'public-read-write',
      key: function (req, file, cb) {
        // extension이 png인지, jpg인지
        const extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  });
  
module.exports = upload;
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require('multer-s3-transform');
const path = require('path');
const sharp = require("sharp"); 

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.region,
});

// 확장자에 대해서 고민하기
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
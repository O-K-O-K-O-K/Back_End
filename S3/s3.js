const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3-transform')
// const multerS3 = require('multer-s3'); // 이걸 쓰면 console.log가 안들어옴
const path = require('path')
const sharp = require('sharp')

// AWS의 내 아이디의 S3 버킷을 이용하기 위해, 액세스 키와 비밀키 그리고 region을 적었다. (환경변수로)
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_KEYID,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
    region: process.env.region,
})

// 확장자에 대해서
// test code에 대해서
const storage = multerS3({
    s3: s3,
    bucket: 'doggy-project-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
        {
            id: 'resized',
            key: function (req, file, cb) {
                try {
                    const fileType = file.mimetype.split('/')[0] != 'image'
                    if (fileType) {
                        return cb(new Error('Only images are allowed'))
                    }
                    let ex = file.originalname.split('.')
                    cb(
                        null,
                        'img' +
                            Date.now() +
                            parseInt(Math.random() * (99 - 10) + 10) +
                            '.' +
                            ex[ex.length - 1]
                    )
                } catch {
                    console.log('multer image upload error')
                    return cb(new Error('multer image upload error'))
                }
            },
            transform: function (req, file, cb) {
                cb(null, sharp().resize(300, 300).rotate())
            },
        },
    ],
    acl: 'public-read-write',
})

module.exports = multer({
    storage: storage,
})

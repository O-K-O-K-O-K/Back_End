const express = require('express');
const router = express.Router();
const user = require('./user');
const post = require('./post');

require('dotenv').config();


router.use('/users', user);
router.use('/posts', post);


module.exports = router;
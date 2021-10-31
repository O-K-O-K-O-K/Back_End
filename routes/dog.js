const express = require('express');
const router = express.Router();
require('dotenv').config();
// const { db } = require('../models/index');

//예시
router.get('/dog', function(req, res, next) {
    res.render('index', { title: 'main page' });

});

module.exports = router;

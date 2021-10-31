const express = require('express');
const router = express.Router();
require('dotenv').config();
const { db } = require('../models/index');

/* post home page. */
router.post('/dog', function(req, res, next) {
  

});

module.exports = router;

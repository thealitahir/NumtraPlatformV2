var express = require('express');
const path = require('path');
var router = express.Router();

var app = express();

router.use(function(req, res, next) {
    return next();
  });

  module.exports = router;
var express = require('express');
var router = express.Router();
var file = require("../controllers/pessoas") 

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

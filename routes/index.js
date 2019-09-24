//getting required packages
var express = require('express');
var router = express.Router();

/* GET Index page. */
router.get('/shop', function(req, res, next) {
  res.render('index');
});

module.exports = router;

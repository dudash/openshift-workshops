var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dcmetro', { title: 'DC Metro Stations' });
});

module.exports = router;

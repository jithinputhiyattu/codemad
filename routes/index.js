var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'codeMad' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'codeMad' });
});

router.get('/articles', function(req, res, next) {
  res.render('articles', { title: 'codeMad' });
});
module.exports = router;

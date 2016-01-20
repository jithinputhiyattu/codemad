var express = require('express');
var router  = express.Router();
var data    = require('../data');

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

router.post('/login_signup',function(req, res, next) 
{
  var userName = req.body.userName;
  console.log('User name : '+userName);
  data.findByName(req, res,function(callback)
  	{
         var html = 'Hello: ' + userName + '.<br>';
         res.send(callback);
  	});
 
});

module.exports = router;

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

router.get('/login',function(req, res, next) 
{
  var userName = req.query.userName;
  console.log('Your user name : '+req.query);
  data.findByName(req, res,function(callback)
    {
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         res.render('home',{userName : callback.name 
          ,email: callback.email });
    });
 
});

router.get('/signup',function(req, res, next) 
{
  var userName = req.query.signupUserName;
  console.log('User name : '+userName);

  data.insertUser(req, res,function(callback)
    {
        console.log(callback);
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         res.send(html);
    });
 
});




module.exports = router;

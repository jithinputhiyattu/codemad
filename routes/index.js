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

router.post('/login',function(req, res, next) 
{
  var userName = req.body.userName;
  console.log(userName);
  data.findByName(req, res,function(callback)
    {
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         res.render('home',{userName : callback.name 
          ,profilePic : callback.picture
          ,email: callback.email });
    });
 
});

router.post('/signup',function(req, res, next) 
{
  var userName = req.body.signupUserName;
  console.log('User name : '+userName);

  data.insertUser(req, res,function(callback)
    {
        console.log(callback);
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         res.send(html);
    });
 
});




module.exports = router;

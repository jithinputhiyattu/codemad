var express = require('express');
var router  = express.Router();
var data    = require('../data');
var fs      = require('fs');

var exec    = require('child-process-promise').exec;
var spawn   = require('child-process-promise').spawn;

var DockerCmd = require("docker-cmd");
var dockerCmd = new DockerCmd();


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

router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'codeMad' });
});

router.get('/exam', function(req, res, next) {
  res.render('exam', { title: 'codeMad' });
});



router.get('/practice', function(req, res, next) {
  res.render('practice', { title: 'codeMad' });
});




router.post('/login',function(req, res, next) 
{
  var userName = req.body.userName;
  console.log(userName);
  data.findByName(req, res,function(callback)
    {
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         res.render('dashboard',{userName : callback.name 
          ,profilePic : callback.picture
          ,email: callback.email });
    });
});


router.post('/execute',function(req, res, next) 
{
  var codearea = req.body.codearea;
  console.log(codearea);

  fs.writeFile("userurl_fact.cpp", codearea, function(err) {
    if(err) 
    {
        return console.log(err);
    }
    else
    {
        //var prc = spawn('./docker/Go.out ', ['codein/fact/userurl.cpp',  'codein/fact/fact_1',  'codein/fact/fact_2', 'codein/fact/fact_3' ]);
      exec('sudo ./Go.out userurl_fact.cpp fact_1 fact_2 fact_3', 
        function callback(error, stdout, stderr)
        {
             console.log(stdout);       
             console.log(error);
             fs.readFile('userurl_fact.output','utf8' ,function readed(err, data)
             {
             if (err) 
              {
                throw err;
              }
              console.log(data);
              res.render('result', { data: data }); 
            });
       });
    }
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

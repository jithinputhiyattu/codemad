var express = require('express');
var router  = express.Router();
var data    = require('../data');
var fs      = require('fs');
var session = require('express-session');
router.use(session({secret: 'secret-key',saveUninitialized: true,resave: true}));

var exec    = require('child-process-promise').exec;
var spawn   = require('child-process-promise').spawn;

var DockerCmd = require("docker-cmd");
var dockerCmd = new DockerCmd();

var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
	sess=req.session;
 if(sess.userName){
 	// res.redirect('dashboard');
 	  res.render('dashboard',{userName : sess.name 
          ,profilePic : sess.profilePic
          ,email: sess.email });
 }
 	else
  res.render('index', { title: 'codeMad' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'codeMad', userName:sess.userName ,profilePic : sess.profilePic
          ,email: sess.email  });
});

router.get('/articles', function(req, res, next) {
  res.render('articles', { title: 'codeMad', userName:sess.userName ,profilePic : sess.profilePic
          ,email: sess.email  });
});

router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'codeMad', userName:sess.userName ,profilePic : sess.profilePic
          ,email: sess.email  });
});

router.get('/exam', function(req, res, next) {
  res.render('exam', { title: 'codeMad' });
});



router.get('/practice', function(req, res, next) {
  res.render('practice', { title: 'codeMad', userName:sess.userName ,profilePic : sess.profilePic
          ,email: sess.email  });
});


router.get('/logout', function(req, res, next) {
 	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});
});




router.post('/login',function(req, res, next) 
{
	sess=req.session;	
	
	sess.userName=req.body.userName;
  var userName = req.body.userName;
  console.log(userName);
  data.findByName(req, res,function(callback)
    {
         var html = '<h3>Hello: ' + userName + ', your email id is :' +callback.email+'</h1>';
         sess.name=callback.name;
         sess.profilePic=callback.picture;

         res.render('dashboard',{userName : callback.name 
          ,profilePic : callback.picture
          ,email: callback.email });

         sess.email=callback.email;
    });

});


router.post('/execute',function(req, res, next) 
{

  var codearea = req.body.codearea;
  console.log(codearea);
  var fileName = sess.userName + "_fact.cpp";
console.log(fileName);
  fs.writeFile(fileName, codearea, function(err) {
    if(err) 
    {
        return console.log(err);
    }
    else
    {
        //var prc = spawn('./docker/Go.out ', ['codein/fact/userurl.cpp',  'codein/fact/fact_1',  'codein/fact/fact_2', 'codein/fact/fact_3' ]);
        //fact_4 fact_5 fact_6 fact_7
      exec('sudo ./Go.out '+sess.userName +'_fact.cpp fact_1 fact_2 fact_3 ', 
        function callback(error, stdout, stderr)
        {
             console.log(stdout);       
             console.log(error);
             fs.readFile(sess.userName+'_fact.output','utf8' ,function readed(err, data)
             {
             if (err) 
              {
                throw err;
              }
              console.log(data);
              //var data=JSON.stringify(data);
              var result=JSON.parse(data);
             res.render('result', { data: result,userName : sess.name 
          ,profilePic : sess.profilePic
          ,email: sess.email }); 
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
         var html = '<h3>Hello ' + userName + ', you have successfully signed up. Please login.</h1>';
         res.send(html);
    });
 
});




module.exports = router;

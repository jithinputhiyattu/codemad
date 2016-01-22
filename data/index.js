/*data management*/
var mongo  = require('mongodb');
var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('codemad', server, {safe: true});

var users  = require('./users');
db.open(function(err, db) 
{

    if(!err) 
    {
        console.log("Connected to 'codemad' database");
        db.collection('users', {safe:true}, function(err, collection)
        {
            if (err) 
            {  console.log("The 'users' collection doesn't exist. Creating it with sample data.");
                users.populateDB( db);
            }
            else
            {
                console.log("The 'users' collection exist..");
            }
        });
    }
    else
    {
    	 console.log("Failed to connect 'codemad' database");
    }
});

exports.findByUserId = function(req, res) 
{
    var id = req.params.id;
    console.log('Retrieving user : ' + id);
    db.collection('users', function(err, collection) 
    {
        collection.findOne({'_id' :new BSON.ObjectID(id)}, function(err, item) 
        {

            res.send(item);
        });
    });
};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.insertUser= function(req, res, callback) 
{
        var user ={name :req.body.userName,
        email :req.body.email,url :req.body.email,
        psw : "9f9bc504c4f714ab1d534b911215badce7695f299c8fab7d6b8dc242e0f88816",
        dob : "03/12/1990", country: "India",joinon : "1/12/2016",picture: req.body.email+".jpg"};

    db.collection('users', function(err, collection) 
    {
        collection.insert(users, {safe:true}, function(err, result) {
            if(err)
            {
                console.log("user insertion failed");
            }
            else
            {
               console.log("user inserted successfully");
            }
            callback(result);
        });
    });
};

exports.findByName = function(req, res, callback) 
{
    var id =  req.body.userName;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) 
    {
        collection.findOne({'url':id}, function(err, item) 
        {
             console.log(item);

             callback(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addUsers = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateUsers= function(req, res) {
    var id = req.params.id;
    var user = req.body;
    delete user._id;
    console.log('Updating users: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}

exports.deleteUsers= function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
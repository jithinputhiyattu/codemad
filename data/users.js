/*data management*/
var mongo  = require('mongodb');
var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('codemad', server, {safe: true});
db.open(function(err, db) 
{
    if(!err) 
    {
        console.log("Connected to 'codemad' database");
        db.collection('users', {safe:true}, function(err, collection)
        {
            if (err) 
            {
                console.log("The 'user' collection doesn't exist. Creating it with sample data.");
                populateDB();
            }
            else
            {
                console.log("The 'user' collection exist..");
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


var populateDB = function() 
{

    var users = [
    {
        name: "Jithin Puthiyattu",
        email: "jithinputhiyattu@gmail.com",
        url : "jithinputhiyattu",
        psw : "sha256code",
        dob : "03/12/1990",
        country: "India",
        joinon : "1/12/2016",
        picture: "jithinputhiyattu.jpg"
    },
    {
        name: "Nisamudheen M",
        email: "",
        url : "nisamudheenm",
        psw : "sha256code",
        dob : "03/12/1992",
        country: "India",
        joinon : "1/12/2016",
        picture: "nisamudheenm.jpg"
    },
    {
        name: "Jishnu V",
        email: "",
        url : "jishnuv",
        psw : "sha256code",
        dob : "03/12/1992",
        country: "India",
        joinon : "1/12/2016",
        picture: "jishnuv.jpg"
    },
    {
        name: "Renju Ashokan",
        email: "",
        url : "renjuashokan",
        psw : "sha256code",
        dob : "03/12/1993",
        country: "India",
        joinon : "1/12/2016",
        picture: "renjuashokan.jpg"
    }];

    db.collection('users', function(err, collection) 
    {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
   };

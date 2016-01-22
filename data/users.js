

var populateDB = function(db) 
{
    console.log('Iside populate db for users');
    var users = [
    {
        name: "Jithin Puthiyattu",
        email: "jithinputhiyattu@gmail.com",
        url : "jithinputhiyattu",
        psw : "9f9bc504c4f714ab1d534b911215badce7695f299c8fab7d6b8dc242e0f88816",
        dob : "03/12/1990",
        country: "India",
        joinon : "1/12/2016",
        picture: "jithinputhiyattu.jpg"
    },
    {
        name: "Nisamudheen M",
        email: "",
        url : "nisamudheenm",
        psw : "9f9bc504c4f714ab1d534b911215badce7695f299c8fab7d6b8dc242e0f88816",
        dob : "03/12/1992",
        country: "India",
        joinon : "1/12/2016",
        picture: "nisamudheenm.jpg"
    },
    {
        name: "Jishnu Vasanth",
        email: "jishnuvasanth@gmail.com",
        url : "jishnuvasanth",
        psw : "9f9bc504c4f714ab1d534b911215badce7695f299c8fab7d6b8dc242e0f88816",
        dob : "03/12/1992",
        country: "India",
        joinon : "1/12/2016",
        picture: "jishnuvasanth.jpg"
    },
    {
        name: "Renju Ashokan",
        email: "nomail@gmail.com",
        url : "renjuashokan",
        psw : "9f9bc504c4f714ab1d534b911215badce7695f299c8fab7d6b8dc242e0f88816",
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


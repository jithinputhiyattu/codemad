

exports.populateDB = function(db) 
{
    console.log('Inside populate db for articles');
    var articles = [
    {
        title: "Inorder Non-threaded Binary Tree Traversal without Recursion or Stack",
        introduction: "We have discussed Thread based Morris Traversal. Can we do inorder traversal without threads if we have parent pointers available to us.?",
        content : "jithinputhiyattu",
    },
    {
        title: "Next Inorder Non-threaded Binary Tree Traversal without Recursion or Stack",
        introduction: "Next We have discussed Thread based Morris Traversal. Can we do inorder traversal without threads if we have parent pointers available to us.?",
        content : "Next jithinputhiyattu",
    }];
    db.collection('articles', function(err, collection) 
    {
        collection.insert(articles, {safe:true}, function(err, result) {});
    });
    db.articles.ensureIndex({email:1},{unique:true}); 
    db.articles.ensureIndex({url:1},{unique:true});
   };


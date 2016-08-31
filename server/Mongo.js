var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/mean_navigation';

function query(query)
{
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
      query(db, function(){
        db.close();
      });
    }
  });
}

function addRoute(origin, destination, points)
{
  query(function(db, cb)
  {
    var collection = db.collection('routes');
    collection.insert([{origin:origin, destination:destination}], function (err, result) {
      if (err || result.insertedIds.length <= 0) {
        console.log(err);
      } else {
        var id=result.insertedIds[0];
        for (var i = 0, len = points.length; i < len; i++) {
          points[i].route_id=id;
        }
        var collection = db.collection('points');
        collection.insert(points, function (err, result) {
          if (err || result.length <= 0) {
            console.log(err);
          } else {
          //SUCCESS
          }
          cb(db);
        });
      }
    });
  });
}
module.exports = addRoute;

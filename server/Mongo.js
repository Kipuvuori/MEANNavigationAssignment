var conf = require("./../conf");

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = "mongodb://"+conf.SERVER_DATABASE+":"+conf.PORT_DATABASE+"/"+conf.DATABASE;



// Function query for making MonoDB query.
function query(query)
{
  // Connect to MongoDB databse.
  MongoClient.connect(url, function (err, db) {
    // Handle result
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
      // Run query
      query(db, function(){
        // And close database when done.
        db.close();
      });
    }
  });
}

class Mongo {
  constructor() {

  }
  // Query for adding route to database
  addRoute(origin, destination, points)
  {
    query(
      function(db, cb)
      {
        var collection = db.collection(conf.COLLECTION_ROUTES); // Collection 'table' for routes
        // Add route to database
        var routes=[{origin:origin, destination:destination}];
        collection.insert(routes,
          function (err, result)
          {
            // Handle error
            if (err)
            {
              console.log(err);
              cb(db);
            }
            else if (result.insertedIds.length <= 0)
            {
              console.log("No ids for inserted routes!");
              cb(db);
            }
            else
            {
              var route_id=result.insertedIds[0]; // Id for added route
              // Adding roite id and order number for points
              var order_num=1;
              for (var i = 0, len = points.length; i < len; i++)
              {
                points[i].order_num=order_num;
                points[i].route_id=route_id;
                ++order_num;
              }
              var collection = db.collection(conf.COLLECTION_POINTS); // Collection 'table' for points
              // Add points to database
              collection.insert(points,
                function (err, result)
                {
                  // Handel result
                  if (err ) console.log(err);
                  cb(db);
                }
              );
            }
          }
        );
      }
    );
  }

  getRoute(origin, destination, return_cb)
  {
    query(
      function(db, cb)
      {
        var collection = db.collection(conf.COLLECTION_ROUTES); // Collection 'table' for routes
        // Add route to database
        var routes=[{origin:origin, destination:destination}];
        collection.findOne({origin: origin, destination:destination},
          function(err, route)
          {
            console.log(route);
            // Handle error
            if (err)
            {
              console.log(err);
              cb(db);
              return_cb(false);
            }
            else if(route && "_id" in route && route._id)
            {
              var collection = db.collection(conf.COLLECTION_POINTS); // Collection 'table' for points
              var ObjectId = require('mongodb').ObjectID;
              console.log(route._id);
              collection.find({"route_id": ObjectId(route._id)}, {'lng': true, 'lat': true, '_id':false}).sort({order_num: 1}).toArray(
                function(err, points)
                {
                  console.log(points);
                  if (err)
                  {
                    console.log(err);
                    cb(db);
                    return_cb(false);
                  }
                  else if(points && points.length > 0)
                  {
                    cb(db);
                    return_cb(points);
                  }
                  else {
                    cb(db);
                    return_cb(false);
                  }
                }
              );
            }
            else {
              cb(db);
              return_cb(false);
            }
          }
        );
      }
    );
  }
}



module.exports = new Mongo();

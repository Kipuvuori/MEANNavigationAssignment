var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

const DATABASE="mean_navigation";
const SERVER="localhost";
const PORT="27017";

const COLLECTION_ROUTES="routes";
const COLLECTION_POINTS="points";

var url = "mongodb://"+SERVER+":"+PORT+"/"+DATABASE;

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

// Query for adding route to database
function addRoute(origin, destination, points)
{
  query(
    function(db, cb)
    {
      var collection = db.collection(COLLECTION_ROUTES); // Collection 'table' for routes
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
            var collection = db.collection(COLLECTION_POINTS); // Collection 'table' for points
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

module.exports = addRoute;

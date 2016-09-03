var conf = require("./../conf");

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = "mongodb://"+conf.SERVER_DATABASE+":"+conf.PORT_DATABASE+"/"+conf.DATABASE;





class Mongo {
  constructor() {

  }

  // Function query for making MonoDB query.
  query(query)
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

  insert(collection_name, data, callback)
  {
    this.query(
      function(db, cb)
      {
        var collection = db.collection(collection_name);
        collection.insert(data,
          function (err, result)
          {
            cb();
            callback(err, result);
          }
        );
      }
    );
  }

  find(collection_name, query, columns, order, callback)
  {
    this.query(
      function(db, cb)
      {
        var collection = db.collection(collection_name);
        collection.find(query, columns).sort(order).toArray(
          function (err, result)
          {
            cb();
            callback(err, result);
          }
        );
      }
    );
  }

  findOne(collection_name, query, callback)
  {
    this.query(
      function(db, cb)
      {
        var collection = db.collection(collection_name);
        collection.findOne(query,
          function (err, result)
          {
            cb();
            callback(err, result);
          }
        );
      }
    );
  }

  // Query for adding route to database
  addRoute(origin, destination, points)
  {
    var routes = [{origin:origin, destination:destination}];
    this.insert(conf.COLLECTION_ROUTES, routes,
      function (err, result)
      {
        // Handle error
        if (err) console.log(err);
        else if (result.insertedIds.length <= 0) console.log("No ids for inserted routes!");
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
          this.insert(conf.COLLECTION_POINTS, points,
            function (err, result)
            {
              if (err) console.log(err); // Handle error
            }
          );
        }
      }
    );
  }

  getRoute(origin, destination, return_cb)
  {
    var route={origin:origin, destination:destination};
    var self=this;
    this.findOne(conf.COLLECTION_ROUTES, route,
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
          var ObjectId = require('mongodb').ObjectID;
          var query = {"route_id": ObjectId(route._id)};
          var columns = {'lng': true, 'lat': true, '_id':false};
          var order = {order_num: 1};
          self.find(conf.COLLECTION_POINTS, query, columns, order,
            function(err, points)
            {
              console.log(points);
              if (err)
              {
                console.log(err);
                return_cb(false);
              }
              else if(points && points.length > 0) return_cb(points);
              else return_cb(false);
            }
          );
        }
      }
    );
  }
}



module.exports = new Mongo();

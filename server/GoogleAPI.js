var fs = require('fs');
var https = require('https');

var Mongo = require('./Mongo.js');

class GoogleAPI {
  constructor() {
    this.API_KEY="AIzaSyBvuj68UXjb-wKx9VIF2Zuo_fol5vihQcs";
    this.BASE_URL="https://maps.googleapis.com/maps/api/";
  }

  directions(origin, destination, data_type, cb)
  {
    var url=this.BASE_URL+"directions/"+data_type+"?origin="+origin+"&destination="+destination+"&key="+this.API_KEY;
    Mongo.getRoute(origin, destination,
      function(points)
      {
        console.log(points);
        if(points) cb(points);
        else
        {
          // Make url for request
          url=encodeURI(url);
          console.log(url);
          var data="";
          https.get(url,
            (response) =>
            {
              // Adding chunk to data.
              response.on('data',
                function (chunk)
                {
                  data += chunk;
                }
              );

              // All data has been read
              response.on('end',
                function ()
                {
                  // Make json
                  var json=JSON.parse(data);
                  // Parse out only cordinates
                  var points=[];
                  if ('routes' in json && json.routes.length > 0 && 'legs' in json.routes[0] &&
                    json.routes[0].legs.length > 0 && 'steps' in json.routes[0].legs[0] &&
                    json.routes[0].legs[0].steps.length > 0)
                  {
                    var steps=json.routes[0].legs[0].steps;
                    for (var i = 0, len = steps.length; i < len; i++) {
                      points.push(steps[i].end_location);
                    }
                  }
                  Mongo.addRoute(origin, destination, points); // Save route to database
                  // Send cordinates to client
                  cb(points);
                }
              );
            }
          ).on('error',
            (e) =>
            {
              console.error(e);
            }
          );
        }
      }
    );
  }
}

module.exports = new GoogleAPI();

var conf = require("./../conf");

var fs = require('fs');
var https = require('https');

var Mongo = require('./Mongo.js');

class GoogleAPI {
  constructor() {
    this.BASE_URL="https://maps.googleapis.com/maps/api/";
  }

  directions(origin, destination, data_type, cb)
  {
    var url=this.BASE_URL+"directions/"+data_type+"?origin="+origin+"&destination="+destination+"&key="+conf.API_DIRECTIONS_KEY;
    Mongo.getRoute(origin, destination,
      function(points)
      {
        if(points) cb(points);
        else
        {
          // Make url for request
          url=encodeURI(url);
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

  geocoding(address, data_type, cb)
  {
    // Make url for request
    var url=this.BASE_URL+"geocode/"+data_type+"?address="+address+"&key="+conf.API_GEOCODING_KEY;
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
            if ('results' in json && json.results.length > 0 &&
              'geometry' in json.results[0] &&
              'location' in json.results[0].geometry &&
              'lat' in json.results[0].geometry.location &&
              'lng' in json.results[0].geometry.location
            )
            {
              var location = json.results[0].geometry.location;
              cb(address, location.lat, location.lng);
            }
            else cb(address, 0, 0);
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

module.exports = new GoogleAPI();

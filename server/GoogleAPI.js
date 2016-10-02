/*
  Made by Santeri Hetekivi
  for Tampere University Of Applied Sciences.
  Licensed under Apache License 2.0.
  10/2016
*/

var conf = require("./../conf");

var fs = require('fs');
var https = require('https');

var Mongo = require('./Mongo.js');

/**
 * Class GoogleAPI
 * for making Google API calls.
 */
class GoogleAPI {
  constructor() {
    this.BASE_URL="https://maps.googleapis.com/maps/api/";
  }

  /**
   * Getting directions between origin and destination.
   * @param  {string}   origin      Start point for the route.
   * @param  {string}   destination End point for the route.
   * @param  {string}   data_type   Type of data (JSON, XML)
   * @param  {Function} cb          Funtion to call with finnished Array
   */
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
                  var route = {origin:origin, destination:destination};
                  var distance=0;
                  // Parse out only cordinates
                  var points=[];
                  if ('routes' in json && json.routes.length > 0 && 'legs' in json.routes[0] &&
                    json.routes[0].legs.length > 0 && 'steps' in json.routes[0].legs[0] &&
                    json.routes[0].legs[0].steps.length > 0)
                  {
                    var steps=json.routes[0].legs[0].steps;
                    for (var i = 0, len = steps.length; i < len; i++) {
                      var point = steps[i].end_location;
                      point.distance = steps[i].distance["value"];
                      distance += point.distance;
                      points.push(point);
                    }
                  }
                  route.distance = distance;
                  Mongo.addRoute(route, points); // Save route to database
                  // Send cordinates to client
                  route.points=points;
                  cb(route);
                }
              );
            }
          ).on('error',
            (e) =>
            {
              console.error(e);
              cb([]);
            }
          );
        }
      }
    );
  }

/**
 * Turns address string to coordinates.
 * @param  {string}   address   Address to geocode
 * @param  {string}   data_type Type of data (JSON, XML)
 * @param  {Function} cb        Funtion that will be called with data.
 */
  geocoding(address, data_type, cb)
  {
    // Make url for request
    var url=this.BASE_URL+"geocode/"+data_type+"?address="+address+"&key="+conf.API_GEOCODING_KEY;
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

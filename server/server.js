/*
  Made by Santeri Hetekivi
  for Tampere University Of Applied Sciences.
  Licensed under Apache License 2.0.
  10/2016
*/

var conf = require("./../conf");

var express = require('express');
var cors = require('cors');
var app = express();
var apicache = require('apicache').options({ debug: false }).middleware;


// Traceur for handeling non ECMAScript 6 versions
var traceur = require('traceur');
traceur.require.makeDefault(function(file) {
  return file.indexOf('node_modules') == -1;
});

// GoogleAPI class for handeling location requests
var GoogleAPI = require('./GoogleAPI');
var MajorCities = require('./MajorCities');
var Dijkstra = require('./Dijkstra');

//Allow all CORS requests
var corsOptions = {
  origin:true,
	maxAge: conf.MAX_CHACHE_AGE,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


// Return route between origin and destination cities.
app.get('/:origin/:destination',
	cors(corsOptions),
  function(request, response)
  {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // Get parameters from url
    var params=request.params;
    // Get route data from google and save it to database
    Dijkstra.getRoute(params.origin, params.destination,
      function(route)
      {
        data=JSON.stringify(route);
        // Output route data
        response.end(data);
      }
    );
  }
);

// Return all of the major cities.
app.get("/major_cities",
	cors(corsOptions), apicache('5 minutes'),
  function(request, response)
  {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    MajorCities.get(
      function (data)
      {
        data=JSON.stringify(data);
        response.end(data);
      }
    );
  }
);

app.listen(conf.PORT_SERVER);

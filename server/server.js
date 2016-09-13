var conf = require("./../conf");

var express = require('express');
var cors = require('cors');
var app = express();


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


app.get('/:origin/:destination',
	cors(corsOptions),
  function(request, response)
  {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // Get parameters from url
    var params=request.params;
    console.log(params);
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

app.get("/major_cities",
	cors(corsOptions),
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

var conf = require("./../conf");

var express = require('express');
var app = express();

// Traceur for handeling non ECMAScript 6 versions
var traceur = require('traceur');
traceur.require.makeDefault(function(file) {
  return file.indexOf('node_modules') == -1;
});

// GoogleAPI class for handeling location requests
var GoogleAPI = require('./GoogleAPI');

app.get('/:origin/:destination',
  function(request, response)
  {
    // Get parameters from url
    var params=request.params;
    console.log(params);
    // Get route data from google and save it to database
    GoogleAPI.directions(params.origin, params.destination, "json",
      function(points)
      {
        data=JSON.stringify(points);
        // Output route data
        response.end(data);
      }
    );
  }
);

app.listen(conf.PORT_SERVER);

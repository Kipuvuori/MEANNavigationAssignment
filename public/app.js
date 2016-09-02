var conf = require("./../conf");

var express = require('express');
var app = express();

// Traceur for handeling non ECMAScript 6 versions
var traceur = require('traceur');
traceur.require.makeDefault(function(file) {
  return file.indexOf('node_modules') == -1;
});

// Port for server
const PORT=8888;

app.get('/',
  function(request, response)
  {
    response.end("Working");
  }
);

app.listen(conf.PORT_APP);

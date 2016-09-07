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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirec('index.html');
});


app.listen(conf.PORT_APP);

var conf = require("./../conf");

var path = require('path');
var compression = require('compression');
var express = require('express');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');

var app = express();

app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));

// Traceur for handeling non ECMAScript 6 versions
var traceur = require('traceur');
traceur.require.makeDefault(function(file) {
  return file.indexOf('node_modules') == -1;
});


app.set('port', conf.PORT_APP);


app.use(serveStatic(__dirname + '/public', {
  maxAge: '1d',
}))

app.listen(app.get('port'));

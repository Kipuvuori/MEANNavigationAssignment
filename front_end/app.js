var conf = require("./../conf");

var path = require('path');
var compression = require('compression');
var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(compression());

// Writing needed info to conf.js file
var fs = require('fs');
<<<<<<< HEAD
fs.writeFile(__dirname + '/public/conf.js', "var REST='" + conf.HOST + ':' + conf.PORT_SERVER + "';", function(err) {
=======
fs.writeFile(__dirname + '/public/js/conf.js', "var PORT_SERVER='" + conf.PORT_SERVER + "';", function(err) {
>>>>>>> interactive_map
    if(err) {
        return console.log(err);
    }

    console.log("The conf.js file was saved!");
});

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

var fs = require('fs');
var https = require('https');

class GoogleAPI {


  constructor() {
    this.API_KEY="AIzaSyBvuj68UXjb-wKx9VIF2Zuo_fol5vihQcs";
    this.BASE_URL="https://maps.googleapis.com/maps/api/";
  }



  directions(origin, destination, data_type, cb)
  {
    var url=this.BASE_URL+"directions/"+data_type+"?origin="+origin+"&destination="+destination+"&key="+this.API_KEY;
    url=encodeURI(url);
    console.log(url);
    var data="";
    https.get(url, (response) => {

      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end', function () {

        var json=JSON.parse(data);
        var cordinates=[];
        if ('routes' in json && json.routes.length > 0 && 'legs' in json.routes[0] &&
          json.routes[0].legs.length > 0 && 'steps' in json.routes[0].legs[0] &&
          json.routes[0].legs[0].steps.length > 0)
        {
          var steps=json.routes[0].legs[0].steps;
          for (var i = 0, len = steps.length; i < len; i++) {
            cordinates.push(steps[i].end_location);
          }
        }
        json=JSON.stringify(cordinates);
        cb(json);
      });
    }).on('error', (e) => {
      console.error(e);
    });
  }
}
module.exports = new GoogleAPI();

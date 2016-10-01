var conf = require("./../conf");
var fs = require('fs');
var parse = require('csv-parse');

var Mongo = require('./Mongo.js');
var GoogleAPI = require('./GoogleAPI');

/**
 * Class MajorCities
 * for handeling major cities.
 */
class MajorCities {
  constructor() {
    this.limit = 20 * 3;
  }

/**
 * Parses CSV file that PATH_MAJOR_CITIES_JSON points to.
 * @param  {Function} callback Function to be called with the result
 */
  parseCSV(callback)
  {
    var self=this;
    var parser = parse({delimiter: ';'},
      function(err, data)
      {
        if(err)
        {
          console.log(err);
          callback([]);
        }
        else
        {
          var major_cities=[];
          var tmp_major_cities={};
          var errors = 0;
          for(var i = 0; i < data.length; ++i)
          {
            var raw = data[i];
            var major_city = {no: parseInt(raw[0]), name: raw[1], lat:0, lng:0};
            var addr = major_city.name+", Finland";
            tmp_major_cities[addr]=major_city;
            GoogleAPI.geocoding(addr, "json",
              function(address, lat, lng)
              {
                if(lat > 0 && lng > 0 && address in tmp_major_cities)
                {
                  var city = tmp_major_cities[address];
                  city.lat = lat;
                  city.lng = lng;
                  major_cities.push(city);
                }
                else
                {
                  console.log("Error while getting coordinated for address: "+address);
                  ++errors;
                }
                if(major_cities.length + errors >= data.length)
                {
                  if(major_cities.length > 0)
                  {
                    Mongo.insert("major_cities", major_cities,
                      function(err, result)
                      {
                        if(err)
                        {
                          console.log(err);
                          callback([]);
                        }
                        else
                        {
                          console.log("major_cities saved");
                          self.get(callback);
                        }
                      }
                    );
                  }
                  else callback([]);
                }
              }
            );
          }
        }
      }
    );
    fs.createReadStream(conf.PATH_MAJOR_CITIES_JSON).pipe(parser);
  }

/**
 * Function for getting major cities.
 * This will parse from CSV if there are any in database.
 * @param  {Function} callback Function what will be called with the result.
 */
  get(callback)
  {
    var self=this;
    var query = {};
    var columns = {};
    var options = {sort: "no", limit: this.limit};
    Mongo.find("major_cities", query, columns, options,
      function(err, major_cities)
      {
        if(err)
        {
          console.log(err);
          self.parseCSV(callback);
        }
        else if(major_cities.length > 0) callback(major_cities);
        else self.parseCSV(callback);
      }
    );
  }
}
module.exports = new MajorCities();

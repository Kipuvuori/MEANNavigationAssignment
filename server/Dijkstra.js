/*
  Made by Santeri Hetekivi
  for Tampere University Of Applied Sciences.
  Licensed under Apache License 2.0.
  10/2016
*/

var conf = require("./../conf");
var tools = require("./../Tools");

var MajorCities = require('./MajorCities.js');

/**
 * Class Dijkstra
 * for handeling dijkstra algorithm.
 */
class Dijkstra {
  constructor() {
  }

/**
 * Call given callback function with fastest route between origin and destination.
 * @param  {string}   origin      Name of the origin city.
 * @param  {string}   destination Name of the destination city.
 * @param  {Function} callback    Function that will be called with result.
 */
  getRoute(origin, destination, callback)
  {
    var self = this;
    // Get major cities.
    MajorCities.get(
      function(major_cities)
      {
        var route = {
          origin: origin, destination: destination,
          distance:0, points: []
        };
        if(!tools.isEmpty(major_cities))
        {
          // Turn major_cities to two diemntional array.
          var twoDimentionalArray = self.toTwoDimentionalArray(major_cities);
          if(!tools.isEmpty(twoDimentionalArray))
          {
            // Make nodes of two dimentional array.
            var nodes = self.nodes(twoDimentionalArray);
            if(!tools.isEmpty(nodes))
            {
              // Find the fastest route trought nodes.
              var fastest_route = self.fastest_route(nodes, origin, destination);
              if(!tools.isEmpty(fastest_route) && !tools.isEmpty(fastest_route.points))
              {
                var prev_name = origin;
                // Replace nodes as major cities.
                for(var i = 0; i < fastest_route.points.length; ++i)
                {
                  var name = fastest_route.points[i];
                  // Find major city by name.
                  var points = major_cities.filter(function( obj ) {
                    return (obj["name"].toLowerCase() == name.toLowerCase());
                  });
                  var point = (tools.isEmpty(points)) ? null : points[0];
                  // Format the point.
                  if(tools.isEmpty(point))
                  {
                    point = {name: name, lat: 0, lng: 0};
                  }
                  else {
                    delete point._id;
                    delete point.no;
                  }
                  // Set the distance from previous city to current.
                  if(tools.isEmpty(nodes) || tools.isEmpty(nodes[prev_name]) ||
                    tools.isEmpty(nodes[prev_name][name]))
                  {
                    distance = 0;
                  }
                  else var distance = nodes[prev_name][name];
                  point.distance = distance;
                  // Add the city to route as a point.
                  fastest_route.points[i] = point;
                  prev_name = name;
                }
                // Add the points and the distance to route.
                route.points = fastest_route.points;
                route.distance = fastest_route.distance;
              }
            }
          }
        }
        callback(route);
      }
    );
  }

/**
 * Turns major cities to two dimentional array.
 * @param  {Array} major_cities Array containing major city objects.
 * @return {Array}              Given major cities as a two dimentional array.
 */
  toTwoDimentionalArray(major_cities)
  {
    if(major_cities.length > 0)
    {
      var lat_lng_major_cities = [];
      var cities_count = major_cities.length;
      var major_city = null;
      var lat_major_cities = [];
      var lats = [];
      var lat = 0;
      // Set cities to array by lattitude.
      for(var i = 0; i < major_cities.length; ++i)
      {
        major_city = major_cities[i];
        lat = major_city.lat;
        lat_major_cities[lat] = major_city;
        lats.push(lat);
      }
      lats.sort();  // Sort cities by lattitude.
      var cols = Math.round(Math.cbrt(lats.length));
      var col_count = 0;
      var row = 0;
      var twoDimentionalArray = [];
      var lngs = [];
      var lng_major_cities = [];
      // Filling rows of the two dimentional array.
      for(var i = 0; i < lats.length; ++i)
      {
        major_city = lat_major_cities[lats[i]];
        lng_major_cities[major_city.lng] = major_city;
        lngs.push(major_city.lng);
        ++col_count;
        // Start new row if col_count is bigger or same as cols.
        if(col_count >= cols)
        {
          lngs.sort();
          twoDimentionalArray[row] = [];
          // Add cities to row.
          for(var index = 0; index < lngs.length; ++index)
          {
            twoDimentionalArray[row].push(lng_major_cities[lngs[index]]);
          }
          lngs = [];
          lng_major_cities = [];
          col_count = 0;
          ++row;
        }
      }
      return twoDimentionalArray;
    }
    else return [];
  }

/**
 * Makes nodes from two dimentional array.
 * @param  {Array} rows Two dimentional array containing all locations.
 * @return {Object}     Map as nodes.
 */
  nodes(rows)
  {
    var nodes = {};
    // Go trought rows of the two diemntional array.
    for(var y = 0; y < rows.length; ++y)
    {
      var row = rows[y];
      // Go trought columns of the row.
      for(var x = 0; x < row.length; ++x)
      {
        var major_city = row[x];
        nodes[major_city.name] = {};
        // Go trought all of the neighbors.
        for(var row_y = y-1; row_y <= y+1 && row_y < rows.length; ++row_y)
        {
          if(row_y >= 0)
          {
            var neigh_row = rows[row_y];
            for(var col_x = x-1; col_x <= x+1 && col_x < neigh_row.length; ++col_x)
            {
              if(col_x >= 0)
              {
                // Make node from city and it's neighbor.
                var neighbor = neigh_row[col_x];
                nodes[major_city.name][neighbor.name] = tools.distanceAsM(major_city,neighbor);
              }
            }
          }
        }
      }
    }
    return nodes;
  }

/**
 * Return fastest_route trought given nodes from origin to destination.
 * @param  {Object} nodes       Map as nodes.
 * @param  {string} origin      Name of starting node.
 * @param  {string} destination Name of ending node.
 * @return {Object}             Return object with route and total distance.
 */
  fastest_route(nodes, origin, destination)
  {
    var dist = {};
    var vis = {};
    var prev = {};
    // Initialize all of the distances and previous nodes.
    for (var key in nodes)
    {
      dist[key] = Infinity;
      prev[key] = null;
    }
    dist[origin] = 0;
    // Go trought all of the nodes.
    for (var i in nodes)
    {
      var cur = -1;
      for (var j in nodes)
      {
        if (vis[j]) continue;
        if (cur == -1 || dist[j] < dist[cur]) {
          cur = j;
        }
      }

      vis[cur] = true;
      // Make the route.
      for (var j in nodes)
      {
        var path = dist[cur] + nodes[cur][j];
        if (path < dist[j]) {
          dist[j] = path;
          prev[j] = cur;
        }
      }
    }
    var route = [];
    var u = destination;
    // Push fastest route to array.
    while(prev[u] != null)
    {
      route.push(u);
      u = prev[u];
    }

    route.push(u);  // Add last point to route.
    // Make the route info.
    return { points: route.reverse(), distance: dist[destination]};
  }
}
module.exports = new Dijkstra();

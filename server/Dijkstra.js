var conf = require("./../conf");

var MajorCities = require('./MajorCities.js');

function distanceAsM(obj1,obj2) {
  var R = 6371000; // Radius of the earth in meters
  var dLat = deg2rad(obj2.lat-obj1.lat);
  var dLon = deg2rad(obj2.lng-obj1.lng);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(obj1.lat)) * Math.cos(deg2rad(obj2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in meters

  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


class Dijkstra {
  constructor() {
    this.max_rows = 20;
  }
  getRoute(origin, destination, callback)
  {
    var self = this;
    MajorCities.get(
      function(major_cities)
      {
        console.log("Got major cities");
        var twoDimentionalArray = self.toTwoDimentionalArray(major_cities);
        console.log("Got twoDimentionalArray");
        var nodes = self.nodes(twoDimentionalArray);
        console.log("Got nodes");

        var route = self.fastest_route(nodes, origin, destination);
        console.log("Got route");
        var prev_name = origin;
        for(var i = 0; i < route.points.length; ++i)
        {
          var name = route.points[i];
          var point = major_cities.filter(function( obj ) {
            return obj.name == name;
          })[0];
          delete point._id;
          delete point.no;
          point.distance = nodes[prev_name][name];
          route.points[i] = point;
          prev_name = name;
        }
        callback(route);
      }
    );
  }
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
      for(var i = 0; i < major_cities.length && i < this.max_rows*3; ++i)
      {
        major_city = major_cities[i];
        lat = major_city.lat;
        lat_major_cities[lat] = major_city;
        lats.push(lat);
      }
      lats.sort();
      var cols = Math.round(Math.cbrt(lats.length));
      var col_count = 0;
      var row = 0;
      var twoDimentionalArray = [];
      var lngs = [];
      var lng_major_cities = [];
      for(var i = 0; i < lats.length; ++i)
      {
        major_city = lat_major_cities[lats[i]];
        lng_major_cities[major_city.lng] = major_city;
        lngs.push(major_city.lng);
        ++col_count;
        if(col_count >= cols)
        {
          lngs.sort();
          twoDimentionalArray[row] = [];
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

  nodes(rows)
  {
    var nodes = {};
    for(var y = 0; y < rows.length; ++y)
    {
      var row = rows[y];
      for(var x = 0; x < row.length; ++x)
      {
        var major_city = row[x];
        nodes[major_city.name] = {};
        for(var row_y = y-1; row_y <= y+1 && row_y < rows.length; ++row_y)
        {
          if(row_y >= 0)
          {
            var neigh_row = rows[row_y];
            for(var col_x = x-1; col_x <= x+1 && col_x < neigh_row.length; ++col_x)
            {
              if(col_x >= 0)
              {
                var neighbor = neigh_row[col_x];
                nodes[major_city.name][neighbor.name] = distanceAsM(major_city,neighbor);
              }
            }
          }
        }
      }
    }
    return nodes;
  }

  fastest_route(nodes, origin, destination)
  {
    var dist = {};
    var vis = {};
    var prev = {};
    for (var key in nodes)
    {
      dist[key] = Infinity;
      prev[key] = null;
    }
    dist[origin] = 0;
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
    while(prev[u] != null)
    {
      route.push(u);
      u = prev[u];
    }

    route.push(u);
    return {origin: origin, destination: destination,
      points: route.reverse(), distance: dist[destination]};
  }
}
module.exports = new Dijkstra();

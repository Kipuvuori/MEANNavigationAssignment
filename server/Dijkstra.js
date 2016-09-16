var conf = require("./../conf");
var tools = require("./../Tools");

var MajorCities = require('./MajorCities.js');

class Dijkstra {
  constructor() {
  }
  getRoute(origin, destination, callback)
  {
    var self = this;
    MajorCities.get(
      function(major_cities)
      {
        var route = {
          origin: origin, destination: destination,
          distance:0, points: []
        };
        if(!tools.isEmpty(major_cities))
        {
          var twoDimentionalArray = self.toTwoDimentionalArray(major_cities);
          if(!tools.isEmpty(twoDimentionalArray))
          {
            var nodes = self.nodes(twoDimentionalArray);
            if(!tools.isEmpty(nodes))
            {
              var fastest_route = self.fastest_route(nodes, origin, destination);
              if(!tools.isEmpty(fastest_route) && !tools.isEmpty(fastest_route.points))
              {
                var prev_name = origin;
                for(var i = 0; i < fastest_route.points.length; ++i)
                {
                  var name = fastest_route.points[i];
                  var points = major_cities.filter(function( obj ) {
                    return (obj["name"].toLowerCase() == name.toLowerCase());
                  });
                  var point = (tools.isEmpty(points)) ? null : points[0];
                  if(tools.isEmpty(point))
                  {
                    point = {name: name, lat: 0, lng: 0};
                  }
                  else {
                    delete point._id;
                    delete point.no;
                  }
                  if(tools.isEmpty(nodes) || tools.isEmpty(nodes[prev_name]) ||
                    tools.isEmpty(nodes[prev_name][name]))
                  {
                    distance = 0;
                  }
                  else var distance = nodes[prev_name][name];
                  point.distance = distance;
                  fastest_route.points[i] = point;
                  prev_name = name;
                }
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
      for(var i = 0; i < major_cities.length; ++i)
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
                nodes[major_city.name][neighbor.name] = tools.distanceAsM(major_city,neighbor);
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
    return { points: route.reverse(), distance: dist[destination]};
  }
}
module.exports = new Dijkstra();

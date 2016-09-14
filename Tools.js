class Tools {
  constructor() {

  }
  isEmpty(obj) {
      if (obj == null) return true;
      if (typeof obj == "undefined") return true;
      if (!obj) return true;
      if(obj instanceof Array || obj instanceof Object || obj instanceof String)
      {
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
      }
      else {
        if (obj.toString().length > 0)    return false;
        if (obj.toString().length === 0)  return true;
      }
      
      if (typeof obj === "object")
      {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
      }
      return true;
  }

  distanceAsM(obj1,obj2) {
    var R = 6371000; // Radius of the earth in meters
    var dLat = this.deg2rad(obj2.lat-obj1.lat);
    var dLon = this.deg2rad(obj2.lng-obj1.lng);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(obj1.lat)) * Math.cos(this.deg2rad(obj2.lat)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in meters

    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}

module.exports = new Tools();

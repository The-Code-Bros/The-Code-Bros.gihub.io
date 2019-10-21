var map = L.map('map').setView([29.8884, -97.9384], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);


var pt = {
  type: 'Feature',
  properties:{name: "San Marcos"},
  geometry: {
    type: 'Point',
    coordinates: [-97.9384, 29.8884]
  }
};

var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
L.geoJson(polygons, {color: "yellow"}).addTo(map);

//pt = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]});
//L.geoJson(pt, {color: "green"}).addTo(map);

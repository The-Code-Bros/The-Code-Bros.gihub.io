var point;
var distance;
var bearing;
var options;
var coordinate;

var map = L.map('map').setView([29.8884, -97.9384], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

function destinationPoint(){
  point = turf.point([-97.9414, 29.8833]);
  distance = 2;
  bearing = 120;
  options = {units: 'miles'};

  coordinate = turf.destination(point, distance, bearing, options);

  L.geoJSON(point).addTo(map);
  L.geoJSON(coordinate).addTo(map);
};

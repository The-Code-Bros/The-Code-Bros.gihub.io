var map = L.map('map').setView([29.8884, -97.9384], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

<<<<<<< HEAD









































// Seans Midpoint Turf function


var marker1 = L.marker()
.setLatLng([29, -97], { dragable: 'true', autoPan: 'true'})
.bindPopup('1')
.addTo(map)
.openPopup();
marker1.dragging.enable();
// When marker is dragged this function updates the coordinates and sets them in a popup window
marker1.on('dragend', function update1() {
     var coord1 = String(marker1.getLatLng()).split(',');
     console.log(coord1);
     var lat1 = coord1[0].split('(');
     console.log(lat1);
     var lng1 = coord1[1].split(')');
     console.log(lng1);
     marker1.bindPopup( lat1[1] + ", " + lng1[0] ).openPopup ();
   });


var marker2 = L.marker()
.setLatLng([28.88, -97.97], { dragable: 'true', autoPan: 'true'})
.bindPopup('2')
.addTo(map)
marker2.dragging.enable();
marker2.on('dragend', function update2() {
     var coord2 = String(marker2.getLatLng()).split(',');
     var lat2 = coord2[0].split('(');
     var lng2 = coord2[1].split(')');
     marker2.bindPopup( lat2[1] + ", " + lng2[0] ).openPopup ();
   });


//note the order of longitude and latitude is switched in turf.
var point1 = turf.point([marker1.getLatLng().lng, marker1.getLatLng().lat]);
var point2 = turf.point([marker2.getLatLng().lng, marker2.getLatLng().lat]);
var midpoint = turf.midpoint(point1, point2);
 // adds turf midpoint to map
 var myMidpoint = L.geoJSON(midpoint)
 .bindPopup ('3')
 .openPopup ()
 .addTo(map)
 myMidpoint.on('click', function (e){
   var point1update = turf.point([marker1.getLatLng().lng, marker1.getLatLng().lat]);
   var point2update = turf.point([marker2.getLatLng().lng, marker2.getLatLng().lat]);
   var midpointupdate = (point1update, point2update)
   var myMidpoint = L.geoJSON(midpoint).addTo(map)
   var coord = String(myMidpoint.getLatLng()).split(',');
   var lat = coord[0].split('(');
   var lng = coord[1].split(')');
   myMidpoint.bindPopup( lat[1] + ", " + lng[0] ).openPopup ();
     });;
=======
//Script to implement turf.destination
var point;
var distance;
var bearing;
var options;
var coordinate;

var pt = {
  type: 'Feature',
  properties:{name: "San Marcos"},
  geometry: {
    type: 'Point',
    coordinates: [-97.9384, 29.8884]
  }
};


//var map = L.map('map').setView([29.8884, -97.9384], 14);

function destinationPoint(){
  point = turf.point([-97.9414, 29.8833]);
  distance = 2;
  bearing = 120;
  options = {units: 'miles'};

  coordinate = turf.destination(point, distance, bearing, options);

  L.geoJSON(point).addTo(map);
  L.geoJSON(coordinate).addTo(map);

};

var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
L.geoJson(polygons, {color: "yellow"}).addTo(map);

pt = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]});
L.geoJson(pt, {color: "green"}).addTo(map);
>>>>>>> 0200f0d2719b5f7ce86629ca5d355c86a9fe4bd6

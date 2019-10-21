# The-Code-Bros.github.io

## Political Boundaries Throughout History
This project will walk through the history of political boundaries in a certain region[s]
(i.e. The states of the United States of America, European countries throughout the 19th Century).

## Slider bar
We will utilize a slider bar, so that the user can scroll through the history of a
time period and new polygons will appear. There is a Leaflet plug-in, Leaflet.Slider,
that was created and maintained by EPP. It utilizes the following code template to
add a slider bar to an online map:

```
newSlider = L.control.slider(<Function> fn, <Control.Slider options> options);
```

This [webmap](https://www.timemaps.com/history/europe-1453ad/) is a good example of what we are trying to achieve.

#Click on the pencil read the code property#

Document from lecture notes for using turf.js within out code
//create a map object
var map = L.map('map').setView([51.5, -0.09], 13);

//base map background
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);



//creating line object that pass a varible to created lenght object
var line = turf.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);// use breakpoints
var length = turf.length(line, {units: 'miles'});
document.getElementById("length").innerHTML = "The length of the linestring is: " + length;

//Object created we will use to display on our Map
var dc = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [-77.031669, 38.878605],
      [-77.029609, 38.881946],
      [-77.020339, 38.884084],
      [-77.025661, 38.885821],
      [-77.021884, 38.889563],
      [-77.019824, 38.892368]
    ]
  }
};

var length = turf.length(dc, { units: 'miles' });

//Code to display on screen
L.geoJson(dc, {color: "red"}).addTo(map);
map.panTo([38.878605, -77.031669])
document.getElementById("length").innerHTML = "The length of the linestring is: " + length;

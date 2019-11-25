require([
    "esri/Map","esri/Basemap", "esri/views/MapView","esri/widgets/Home","esri/widgets/Compass","esri/layers/FeatureLayer",
    "esri/widgets/Feature","esri/widgets/Search","esri/widgets/LayerList","esri/widgets/BasemapToggle",	"esri/widgets/Legend",
    "esri/widgets/Expand","esri/widgets/Print","esri/layers/GraphicsLayer","esri/tasks/QueryTask","esri/tasks/support/Query",
    "dojo/_base/array","dojo/dom","dojo/on","dojo/domReady!"
  ],
  function(
    Map,Basemap,MapView,Home,Compass,FeatureLayer,Feature,Search,LayerList,BasemapToggle,Legend,Expand,Print, GraphicsLayer, QueryTask, Query, arrayUtils, dom, on,
  ){
  //Create Crime Pop-up Template and Content
  var crimeTemplate = { // autocasts as new PopupTemplate()
        title: "Property Crime Rate in Austin, Texas",
        content: [{
        // It is also possible to set the fieldInfos outside of the content
        // directly in the popupTemplate. If no fieldInfos is specifically set
        // in the content, it defaults to whatever may be set within the popupTemplate.
        type: "fields",
        fieldInfos: [{
          fieldName: "Highest Offense Description",
          label: "<b>Crime Type</b>",
          visible: true
        }, {
          fieldName: "Occurred Date",
          label: "<b>Date</b>",
          visible: true,
        }, {
          fieldName: "Report Date Time",
          label: "<b>Report Date</b>",
          visible: true,
        }, {
          fieldName: "Census Tract",
          label: "<b>Census Tracts</b>",
          visible: true,
       }]
     }]
    };



var heatmapRenderer = {
type: "heatmap",
colorStops: [
  { color: "rgba(63, 40, 102, 0)", ratio: 0 },
  { color: "#ffffb2", ratio: 0.1 },
  { color: "#fed976", ratio: 0.2 },
  { color: "#feb24c", ratio: 0.4 },
  { color: "#fd8d3c", ratio: 0.6 },
  { color: "#fc4e2a", ratio: 0.8 },
  { color: "#e31a1c", ratio: 0.9 },
  { color: "#b10026", ratio: 1 }
],
minPixelIntensity: 0,
maxPixelIntensity: 1000
};

//Adding feature layers from service
var crimeLayer1 = new FeatureLayer({
url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/property_crime__AUSITN_GEOJSON/FeatureServer/0?token=a0RCfrWhHEkwUJ1QIyBIdP9PZ-OUGqKvZbjLtUxksQW-vKDPa3CBLWsaRoEKoRn3IvG5tx_GEET4UScGyZfvbt0phOSxgwYz85gaaC8xjSt_7YBgGAvv3Ut-zLbR63GgE7hrr1kXyw0910EUhGpJilF7bk5cHhPYL2IYWdMvueL6hvRVbAGYBglo4p-MGNxlQozwPGOaVB5SBwDfNPw328GJ8a9HFwoEv0n6Ieh_8FhFa2NeWAQ8WBK6oEB7RB_D",
title: "2010 Census Crime Heatmap",
oufeilds: ["*"],
visible: true,
renderer: heatmapRenderer,
opacity: 0.8,
view: view,
popupTemplate: crimeTemplate
});

// Create the Map and add the featureLayer defined above
var map = new Map({
basemap: "streets",
layers: [crimeLayer1]
});

// Create the MapView
var view = new MapView({
container: "viewDiv",
map: map,
center: [-97.748403, 30.317977],
zoom: 11
});

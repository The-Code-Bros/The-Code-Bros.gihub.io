
  require ([
  "esri/Map",
  "esri/views/MapView",

  ],
      function(Map, MapView){

      var map = new Map ({
      basemap: "oceans",
      });

      var view = new MapView ({
      container: "viewDiv",
      map: map,
      zoom: 10,
      center: [-97, 30],
      extent: {  // autocasts as new Extent()
            xmin: 96,
            ymin: 28,
            xmax: 98,
            ymax: 32,
            spatialreference: {
                "wkid": 102100,
                  "latestWkid": 2276     //NAD_1983_StatePlane_Texas_North_Central_FIPS_4202_Feet
              }
          }
      });



  });

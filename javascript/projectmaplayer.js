
  require ([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/TileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer"
  ],
  // This is the principle function that derives that map. It calls the muliple variables established within the function that coincide with the esri layers in requiered.
      function(Map, MapView, TileLayer, FeatureLayer, MapImageLayer){


      var incomeblocks = new FeatureLayer ({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/INCOMEBLOCKS_AUSTIN/FeatureServer/0?token=ldpw2fJrMgNWJ95fCH7TC45zhEz78T77kDsvIBkPJNvrg8zlVNzy7jBOTYGKA4jR8Zaw3kXJUOuHSmeaEYv1rC5az2hepkOOAqmI4e7RJpuv4pGcEnqvcltZ0PtAhKfhSzfroN9yL2WXW8PUeNCaJqnKkrAnchaGUd9C29kFgomRaWxCxLdGHkGD1LXtmSVRtkferOQtWh3eR1gkh-6vMT0hknmKZCqlic5R6hKwxdYcNDe2SnOtKjncVV12YdtK"
    });

    var incometracts = new FeatureLayer ({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/INCOMETRACTS/FeatureServer/0?token=oE-5bd2GE3x4xckKEKZeoHjE8tym84tL7clQ8tBjiklJYp8qXX-8SBJhQnqurtGAeHLQQvC2qqr7cc1KEVfIycbGg7ct6GAkLCAX5E8nxhg9I959I0zJqNUdQOXS8tk2gK12JvYQaoxbj1pgleq_A7HwUc9_k2AvyiBUNL_NWWMhHym976m5y2XWEqEYDyojgHcQSOKL9TQMT5KUBmgzIJ9Ff3TAr5R83hWfJX1hp_JcYKu9ZdqKWjqaLdZ8Olqt"
    });



    var permits = new FeatureLayer ({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/PERMITPOINTS_AUSITN/FeatureServer/0?token=KtVKY3pkFI_gaXE1b3vH0eQkMFJFc1V6OdDFv95-zBsoS2Tw0NT-T_T8JOo70smsZXUeVFBmQuDnaITFH8uAoUXWZZGDdW7dnNnNkyMtmyWK3SGDcriC4f0PvADiu0dmAXMTiHysKZqWBKHeNSyjJdhyd_jMx20xnedFbWTyhfqUhxX1dHiQVstKDjt5KM15D0tdE8-GZ4f394djmVJxog0v8sXeE4tQPeNpdobvf_rrQNgO01LzakR6lBaxZJPY"
    });

    const Poor = {
               type: "simple-fill", // autocasts as new SimpleFillSymbol()
               color: "#fffcd4",
               style: "solid",
               outline: {
                 width: 0.2,
                 color: [255, 255, 255, 0.5]
               }
             };
             const LowerMiddle = {
               type: "simple-fill", // autocasts as new SimpleFillSymbol()
               color: "#b1cdc2",
               style: "solid",
               outline: {
                 width: 0.2,
                 color: [255, 255, 255, 0.5]
               }
             };
             const UpperMiddle = {
               type: "simple-fill", // autocasts as new SimpleFillSymbol()
               color: "#38627a",
               style: "solid",
               outline: {
                 width: 0.2,
                 color: [255, 255, 255, 0.5]
               }
             };
             const Rich = {
               type: "simple-fill", // autocasts as new SimpleFillSymbol()
               color: "#0d2644",
               style: "solid",
               outline: {
                 width: 0.2,
                 color: [255, 255, 255, 0.5]
               }
             };


      const incomerenderer = {
            type: "class-breaks", // autocasts as new ClassBreaksRenderer()
            field: "field6",
            legendOptions: {
              title: "Income"
            },
            defaultSymbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "black",
              style: "backward-diagonal",
              outline: {
                width: 0.5,
                color: [50, 50, 50, 0.6]
              }
            },
            defaultLabel: "no data",
            classBreakInfos: [
              {
                minValue: 0,
                maxValue: 25000,
                symbol: Poor,
                label: ">25000"
              },
              {
                minValue: 25001,
                maxValue: 60000,
                symbol: LowerMiddle,
                label: "25k-60k"
              },
              {
                minValue: 60001,
                maxValue: 90000,
                symbol: UpperMiddle,
                label: "60K-80K"
              },
              {
                minValue: 90001,
                maxValue: 1000000,
                symbol: Rich,
                label: "80k-120k"
              }
            ]
          };

          var permitrenderer = {
          type: "simple", //autocasts as a new SimpleRenderer()
          symbol:{
          type: "simple-marker", //autocasts as a new SimpleMarkerSymbol()
          size:2,
          color: "Red",
          style: "circle",
          outline: {
          width: 1,
          color: "Red"
          }
          },
          label: "Buildings"
          };


          var incomeblocks = new FeatureLayer ({
          url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/INCOMEBLOCKS_AUSTIN/FeatureServer/0?token=ldpw2fJrMgNWJ95fCH7TC45zhEz78T77kDsvIBkPJNvrg8zlVNzy7jBOTYGKA4jR8Zaw3kXJUOuHSmeaEYv1rC5az2hepkOOAqmI4e7RJpuv4pGcEnqvcltZ0PtAhKfhSzfroN9yL2WXW8PUeNCaJqnKkrAnchaGUd9C29kFgomRaWxCxLdGHkGD1LXtmSVRtkferOQtWh3eR1gkh-6vMT0hknmKZCqlic5R6hKwxdYcNDe2SnOtKjncVV12YdtK\0",
          title: "Average Household Income",
            renderer: incomerenderer,
            popupTemplate: {
              // autocast as esri/PopupTemplate
              title: "Block Group",
              content: "Income="
            },
            opacity: 0.9
          });

      // This creates a variable map and sets it as a new map layer. It calls forth the dark gray base map type and sets the additional layers on th emap as our previous vaiables.
      var map = new Map ({
      basemap: "dark-gray",
      layers: [ incomeblocks, incometracts, crime, permits]
      });
      // This sets a new map view. It places it in the html body contaioner. It sets the map to call as the map we created in the last variable. sets the zoom to 10 and sets the opening corrdinates on californiea.
      var view = new MapView ({
      container: "viewDiv",
      map: map,
      zoom: 10,
      center: [-97.2095, 28.0866]
      });
  });


  const legend = new Legend({
          view: view
        });

        view.ui.add(legend, "bottom-left");

//comment

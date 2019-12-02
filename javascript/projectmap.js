  require([
  "esri/Map",
  "esri/Basemap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Feature",
  "esri/widgets/Legend",
  "esri/widgets/TimeSlider",
  "esri/widgets/Fullscreen",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/Home",
  "esri/layers/GraphicsLayer",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/tasks/support/StatisticDefinition",
  "esri/Graphic",
  "dojo/_base/array",
  "dojo/dom",
  "dojo/on",
  "dojo/domReady!"
],

function(Map, Basemap, MapView, FeatureLayer, Feature, Legend, TimeSlider, Fullscreen, LayerList, Search, Home, GraphicsLayer, QueryTask, Query, StatisticDefinition, Graphic, arrayUtils, dom, on){

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


        const incometractrenderer = {
              type: "class-breaks", // autocasts as new ClassBreaksRenderer()
              field: "field5",
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

            var crimepoints = new FeatureLayer({
              url:
                "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/property_crime__AUSITN_GEOJSON/FeatureServer/0?token=a0RCfrWhHEkwUJ1QIyBIdP9PZ-OUGqKvZbjLtUxksQW-vKDPa3CBLWsaRoEKoRn3IvG5tx_GEET4UScGyZfvbt0phOSxgwYz85gaaC8xjSt_7YBgGAvv3Ut-zLbR63GgE7hrr1kXyw0910EUhGpJilF7bk5cHhPYL2IYWdMvueL6hvRVbAGYBglo4p-MGNxlQozwPGOaVB5SBwDfNPw328GJ8a9HFwoEv0n6Ieh_8FhFa2NeWAQ8WBK6oEB7RB_D",
              visible: false,
              opacity: 0.6,
              title: "Crime Points",
              renderer: {
                type: "simple",
                symbol: {
                  type: "simple-marker",
                  color: "yellow",
                  size: 5
                }
              },
              popupTemplate: {
                // autocasts as new PopupTemplate()
                title: "Property Crimes",

                // Set content elements in the order to display.
                // The first element displayed here is the fieldInfos.
                content: [
                  {
                    // It is also possible to set the fieldInfos outside of the content
                    // directly in the popupTemplate. If no fieldInfos is specifically set
                    // in the content, it defaults to whatever may be set within the popupTemplate.
                    type: "fields", // FieldsContentElement
                    fieldInfos: [
                      {
                        fieldName: "Highest_Offense_Description",
                        visible: true,
                        label: "Types of Crimes",
                        format: {
                          places: 0,
                          digitSeparator: true
                        }
                      },
                      {
                        fieldName: "Address",
                        visible: true,
                        label: "Address"
                      },
                      {
                        fieldName: "Census_Tract",
                        visible: true,
                        label: "Tract",
                        format: {
                          places: 2,
                          digitSeparator: true
                        }
                      }
                    ]
                  },
                  {
                    // You can also set a descriptive text element. This element
                    // uses an attribute from the featurelayer which displays a
                    // sentence giving the total amount of trees value within a
                    // specified census block. Text elements can only be set within the content.
                    type: "text", // TextContentElement
                    text:
                      "{Highest_Offense_Description} at {Address} within Census Tract {Census_Tract}"
                  },

                ]
              },
              outFields: ["*"]
            });

  // Query the total number of crimes commits within a census tract or incometacts
      var queryCrimecount = new QueryTask({
        url:
          "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/property_crime__AUSITN_GEOJSON/FeatureServer/0?token=a0RCfrWhHEkwUJ1QIyBIdP9PZ-OUGqKvZbjLtUxksQW-vKDPa3CBLWsaRoEKoRn3IvG5tx_GEET4UScGyZfvbt0phOSxgwYz85gaaC8xjSt_7YBgGAvv3Ut-zLbR63GgE7hrr1kXyw0910EUhGpJilF7bk5cHhPYL2IYWdMvueL6hvRVbAGYBglo4p-MGNxlQozwPGOaVB5SBwDfNPw328GJ8a9HFwoEv0n6Ieh_8FhFa2NeWAQ8WBK6oEB7RB_D"
          });

      var incometracts = new FeatureLayer ({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/INCOMETRACTS/FeatureServer/0?token=oE-5bd2GE3x4xckKEKZeoHjE8tym84tL7clQ8tBjiklJYp8qXX-8SBJhQnqurtGAeHLQQvC2qqr7cc1KEVfIycbGg7ct6GAkLCAX5E8nxhg9I959I0zJqNUdQOXS8tk2gK12JvYQaoxbj1pgleq_A7HwUc9_k2AvyiBUNL_NWWMhHym976m5y2XWEqEYDyojgHcQSOKL9TQMT5KUBmgzIJ9Ff3TAr5R83hWfJX1hp_JcYKu9ZdqKWjqaLdZ8Olqt",
        title: "Average Household Income",
          renderer: incometractrenderer,
          popupTemplate:     /*This popupTemplate variable is declared. It defines what the popup for a
              census block will be as a result of user selection. It includes the census block's
              name, year of selection, population, average annual household income.............. */
              {
                fieldInfos: [{
                  fieldName: "NAME", // needs field name
                  label: "Census Tract",
                  format: {
                    places: 2,
                    digitSeperator: true
                  }
                }, {
                  fieldName: "Field2", // needs field name
                  label: "Average Annual Household Income",
                  format: {
                    places: 0,
                    digitSeperator: true
                  }
                }, {
                  fieldName: "Field3", // needs field name
                  label: "Average Annual Household Income",
                  format: {
                    places: 0,
                    digitSeperator: true
                  }
                }, {
                  fieldName: "Field4", // needs field name
                  label: "Average Annual Household Income",
                  format: {
                    places: 0,
                    digitSeperator: true
                  }
                }, {
                  fieldName: "Field5", // needs field name
                  label: "Average Annual Household Income",
                  format: {
                    places: 0,
                    digitSeperator: true
                  }
                }],
                title: "Census Tract " + "{NAME}",
                outFields: ["*"],
                content: queryCrime
              },/*{
            // autocasts as new PopupTemplate()
            title: "Census Tract {NAME}",
            content: queryCrime
          }*/
          opacity: 0.6
        });

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

    var heatmapRendererpermits = {
      type: "heatmap",
      colorStops: [
        { color: "rgba(63, 40, 102, 0)", ratio: 0 },
        { color: "#edf8e9", ratio: 0.1 },
        { color: "#c7e9c0", ratio: 0.2 },
        { color: "#a1d99b", ratio: 0.4 },
        { color: "#74c476", ratio: 0.6 },
        { color: "#41ad5d", ratio: 0.8 },
        { color: "#238b45", ratio: 0.9 },
        { color: "#005a32", ratio: 1 }
      ],
      minPixelIntensity: 10,
      maxPixelIntensity: 1000
    }

    var permits = new FeatureLayer ({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/PERMITPOINTS_AUSITN/FeatureServer/0?token=KtVKY3pkFI_gaXE1b3vH0eQkMFJFc1V6OdDFv95-zBsoS2Tw0NT-T_T8JOo70smsZXUeVFBmQuDnaITFH8uAoUXWZZGDdW7dnNnNkyMtmyWK3SGDcriC4f0PvADiu0dmAXMTiHysKZqWBKHeNSyjJdhyd_jMx20xnedFbWTyhfqUhxX1dHiQVstKDjt5KM15D0tdE8-GZ4f394djmVJxog0v8sXeE4tQPeNpdobvf_rrQNgO01LzakR6lBaxZJPY",
      title: "New Construction Heatmap",
      outFields: ["*"],
      visible: false,
      renderer: heatmapRendererpermits,
      opacity: 0.6,
      view: view
    });

    //Adding feature layers from service
    var crimeheatmap = new FeatureLayer({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/property_crime__AUSITN_GEOJSON/FeatureServer/0?token=a0RCfrWhHEkwUJ1QIyBIdP9PZ-OUGqKvZbjLtUxksQW-vKDPa3CBLWsaRoEKoRn3IvG5tx_GEET4UScGyZfvbt0phOSxgwYz85gaaC8xjSt_7YBgGAvv3Ut-zLbR63GgE7hrr1kXyw0910EUhGpJilF7bk5cHhPYL2IYWdMvueL6hvRVbAGYBglo4p-MGNxlQozwPGOaVB5SBwDfNPw328GJ8a9HFwoEv0n6Ieh_8FhFa2NeWAQ8WBK6oEB7RB_D",
      title: "Crime Heatmap",
      outFields: ["*"],
      visible: false,
      renderer: heatmapRenderer,
      opacity: 0.6,
      view: view,
      popupTemplate: crimeTemplate
    });

  /*A local variable called map is created with the basemap loaded as one of
  its attributes. It calls on the Map module.*/
  var map = new Map({
    basemap: "satellite",
    layers: [crimepoints, incometracts, permits, crimeheatmap]
  });

  /*A local variable called view is created and calls on the MapView
  module. Its container attribute is set to the name of the division
  that occurs later in the body. The map attribute is set to the map variable
  previously created. The zoom attribute is set to zoom level 11.
  The center attribute is set to a unique center coordinate with
  a latitude/longitude pair that corresponds to a point near the
  middle of Austin. */
  var view = new MapView({
    container: "map",
    map: map,
    zoom: 11,
    center: [-97.7431, 30.30]
  });

  // Adds new time slider into a variable named timeSlider that is contained
  // in the time-slider div.
  var timeSlider = new TimeSlider({
    container: "time-slider",
    view: view,
    // show data at a specific time rather than within a range of times
    mode: "instant",
    fullTimeExtent: { // entire extent of the timeSlider
      start: new Date(2010, 0, 1),
      end: new Date(2019, 0, 1)
    },
    values:[ // location of timeSlider thumbs
      new Date(2010, 0, 1),
      new Date(2011, 1, 1),
      new Date(2012, 1, 1),
      new Date(2013, 1, 1),
      new Date(2014, 1, 1),
      new Date(2015, 1, 1),
      new Date(2016, 1, 1),
      new Date(2017, 1, 1),
      new Date(2018, 1, 1),
      new Date(2019, 1, 1)
    ],
    // Defines at what interval and units the slider will stop at thumb locations along slider bar.
    stops: {
      interval: {
        value: 1,
        unit: "years"
      },
      timeExtent: {
        start: new Date(2010, 0, 1),
        end: new Date(2019, 0, 1)
      }
    },
  });
  view.ui.add(timeSlider, "manual");

  // Adds fullscreen widget into map.
  fullscreen = new Fullscreen({
    view: view
  });
  view.ui.add(fullscreen, "top-left");

  // Adds a table of contents into map.
  var layerList = new LayerList({
    view: view,
    listItemCreatedFunction: function(event) {
        const item = event.item;
        if (item.layer.type != "group") {
          // don't show legend twice
          item.panel = {
            content: "legend",
            open: true
          };
        }
      }
  });
  view.ui.add(layerList, {
    position: "top-left"
  });

  // Add Search Widget
  var searchWidget = new Search({
    locationEnabled: true,
    maxResults: 3,
    maxSuggestions: 3,
    minSuggestCharacters: 2,
    suggestionsEnabled: true,
    view: view,
  });
  view.ui.add(searchWidget, {
    position: "top-right"
  });

  // Add Home Widget
  var homeWidget = new Home({
    view: view
  });

  // adds the home widget to the top left corner of the MapView
  view.ui.add(homeWidget, "top-right");

  // Make the Time Slider element draggable:
  dragElement(document.getElementById("time-slider"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  //start of crime count function
            function queryCrime(target) {
              // count and types of electric charging stations that intersect the county
              var countLevel1 = new StatisticDefinition({
                statisticType: "count",
                onStatisticField: "Highest_Offense_Description",
                outStatisticFieldName: "numLevel_1"
              });

              var query = new Query({
                geometry: target.graphic.geometry,
                outFields: ["*"],
                spatialRelationship: "intersects",
                outStatistics: [countLevel1]
              });

              // execute the query task
              return queryCrimecount
                .execute(query)
                .then(function(result) {
                  var stats = result.features[0].attributes;

                  // format the query result for the counties popupTemplate's content.
                  return (
                    "<br><b>Average Annual Household Income: </b> {Field2}" +
                    "<br><b>Average Annual Household Income: </b> {Field3}" +
                    "<br><b>Average Annual Household Income: </b> {Field4}" +
                    "<br><b>Average Annual Household Income: </b> {Field5}" +
                    "<br><b>Total Crime Count (2010-2019): </b>" +
                    (stats.numLevel_1)
                  );
                });
          } //end of querycrime count function

//Watch for the on click popup for Incometracts to display crime count
  view.popup.watch("selectedFeature", function(e) {
    view.graphics.removeAll();
    if (e && e.geometry) {
      view.graphics.add(
        new Graphic({
          geometry: e.geometry,
          symbol: {
            type: "simple-fill",
            style: "none",
            outline: {
              color: "#6600FF",
              width: 2
            }
          }
        })
      );
    }
  });

/*    // query for selection of crimes by year
    var resultsLayer = new GraphicsLayer();
    var qTask = new QueryTask({
      url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/INCOMEBLOCKS_AUSTIN/FeatureServer/0?token=ldpw2fJrMgNWJ95fCH7TC45zhEz78T77kDsvIBkPJNvrg8zlVNzy7jBOTYGKA4jR8Zaw3kXJUOuHSmeaEYv1rC5az2hepkOOAqmI4e7RJpuv4pGcEnqvcltZ0PtAhKfhSzfroN9yL2WXW8PUeNCaJqnKkrAnchaGUd9C29kFgomRaWxCxLdGHkGD1LXtmSVRtkferOQtWh3eR1gkh-6vMT0hknmKZCqlic5R6hKwxdYcNDe2SnOtKjncVV12Ydt"
    });

    var params = new Query({
      returnGeometry: true,
      outFields: ["*"]
  });

  view.when(function() {
    view.ui.add("optionsDiv", "bottom-right");
    on(dom.byId("doBtn"), "click", doQuery);
  });

  var attributeName = dom.byId("attSelect");
  var expressionSign = dom.byId("signSelect");
  var value = dom.byId("valSelect");

  function doQuery() {
    resultsLayer.removeAll();
    params.where = attributeName.value + expressionSign.value + value.value;
    qTask.execute(params)
      .then(getResults)
      .catch(promiseRejected);
  }

  function getResults(response) {
    var popResults = arrayUtils.map(response.features, function(
      feature) {
      feature.popupTemplate = popupTemplate;
      return feature;
  });

  resultsLayer.addMany(popResults);
  view.goTo(popResults).then(function() {
    view.popup.open({
      features: popResults,
      featuresMenuOpen: true,
      updateLocationEnabled: true
    });
  });

  dom.byId("printResults").innerHTML = popResults.length + " results found!";
  }

  function promiseRejected(error) {
    console.error("Promise rejected: ", error.message);
  }*/


}); //end

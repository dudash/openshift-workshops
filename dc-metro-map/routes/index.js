var express = require('express');
var router = express.Router();
var rest = require('restler');

//-----------------------------------------------------------------------------
// CONSTANTS AND HELPERS
//-----------------------------------------------------------------------------
var API_KEY_PLACEHOLDER = process.env.WMATA_API_KEY || '2cc419c974f94b5486dd79d698f7d3f6';
var BEERME = process.env.BEERME || false;
var RAINBOW = process.env.RAINBOW || false;
console.log("using WMATA API Key - " + API_KEY_PLACEHOLDER);
if (BEERME == 'true') { console.log("Beer Me! "); }
if (RAINBOW == 'true') { console.log("Rainbows! "); }

// var DCBEER = {
//     type: "FeatureCollection",
//     features: [{
//         type: "Feature",
//         geometry: {
//             type: "Point",
//             coordinates: [-77.009003, 38.889931]
//         },
//         properties: {
//             "name": "BEER",
//             "marker-color": "#000000",
//             "marker-symbol": "beer",
//         }
//     }]
// };

//-----------------------------------------------------------------------------
// ROUTES
//-----------------------------------------------------------------------------
function wmataJsonToGeoJson(jsonData) {
  var dataOut = { type: "FeatureCollection", features: [] };
  var markerSym = "bus";
  var markerColor = "#000000";
  if (BEERME == 'true') { markerSym = "beer"; }

  if (jsonData.BusPositions) {
    jsonData.BusPositions.forEach(function(item, index) {
      if (RAINBOW == 'true') { markerColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16); }
      dataOut.features.push({type:"Feature",
          geometry: {
              type: "Point",
              coordinates: [item['Lon'], item['Lat']]
          },
          properties: {
              title: "Bus #" + item['VehicleID'],
              description: item['TripHeadsign'],
              'marker-size': "small",
              "marker-color": markerColor,
              "marker-symbol": markerSym,
          }
      });
    });
  }
  return dataOut;
}

//-----------------------------------------------------------------------------
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dcmetro', { title: 'D.C. Metro Stations', BEERME: BEERME });
});

//-----------------------------------------------------------------------------
/* GET busses - this is called by our dcmetro map index periodically */
router.get('/busses.json', function(req, res, next) {
  // center on DC and 20 miles = ~32K meters
  //var WMATA_URL='https://api.wmata.com/Bus.svc/json/jBusPositions?Lat=38.889931&Lon=-77.009003&Radius=32186.9';
  var WMATA_URL='https://api.wmata.com/Bus.svc/json/jBusPositions';
  //var WMATA_URL='https://api.wmata.com/NextBusService.svc/json/jBusPositions';
  
  // rest call to get
  rest.get(WMATA_URL, {
    query : { Lat: 38.889931, Lon: -77.009003, Radius: 32186.9 },
    headers : { api_key: API_KEY_PLACEHOLDER }
  }).on('complete', function(data) {
    //console.log("GET on " + WMATA_URL + " data out:");
    //console.log(data); // auto convert to object 

    // TODO error handling of "statusCode: 401"
    // TODO error handling for valid geo JSON

    res.send(wmataJsonToGeoJson(data));
    //res.send(DCBEER);  // uncomment to test with static JSON data - a beer icon center on DC
  });
});

module.exports = router;

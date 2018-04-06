// Leaflet map setup
var map = L.map('map', {
  center: [40.000, -75.1190],
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// To add your Carto visualization, change cartoUserName and cartoVizId to your username and
// project ID. These values can be found in the URL of your map on Carto:
// - https://[cartoUserName].carto.com/[cartoVizId]

// Unfortunately, only some visualizations styles are available in this method:
//
// - None
// - Animated
// - Pixel
//
// This is a bummer. But don't worry, we'll learn about how to do more powerful visualizations
// with Carto next week when we learn about SQL

// To add visualizations created with the Analysis feature, you will need to export the data to a
// GeoJSON. From there, you can either import the GeoJSON to Carto or use Leaflet's L.geoJson.

var cartoUserName = 'chenranwu';
var cartoVizId = '67361d24-4a9b-42fc-9555-2fe0ef930c6c';

var layerUrl = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId+'/viz.json';
var dataset = "https://raw.githubusercontent.com/chenranwu/OST4GIS-week10/master/lab/lab2/data_geocodio_0b1a812e7e449e7c23e32aaf04367f8f07165abe.geojson";

console.log(layerUrl);

cartodb.createLayer(map, layerUrl)
  .on('done', function(layer) {
    layer.addTo(map);
  }).on('error', function(err) {
    console.log(err);
  });


$(document).ready(function() {
     $.ajax(dataset).done(function(data) {
       var parsedData = JSON.parse(data);
       L.geoJson(parsedData).addTo(map);
     }
   );
  }
  );



 /*$(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);

      L.geoJson(data).addTo(map);
    }
  );
}
);
*/

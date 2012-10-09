var request = require('request');

var API_SERVER = 'http://www.publicstuff.com/ajax/';
var STATIC_PARAMS = {
  space_id: 27412
};

exports.version = '0.0.1';

exports.requests = function(params, callback){
  invoke(params, 'get_map_requests', function(resp) {
    callback(resp);
  });
};

exports.request = function(id, callback) {
  invoke({"request_id": id}, 'get_map_request_details', function(resp) {
    callback(resp);
  });
};

// Convience function to turn a 311 request response
// set into a GeoJSON object.
exports.toGeojson = function(features) {
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  };

  features.forEach(function(feature) {
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [Number(feature.latitude), Number(feature.longitude)]
      },
      "properties": {
        "id": feature.id,
        "address": feature.address,
        "request_type": feature.request_type_id,
        "date_created": feature.date_created,
        "status": feature.status,
        "title": feature.title,
        "slug": feature.slug,
        "image": feature.image,
        "score": feature.score,
        "location": feature.location,
        "count_comments": feature.count_comments,
        "count_followers": feature.count_followers
      }
    });
  });

  return geojson;
};

// Helpers
function invoke(params, path, callback) {
  addStatic(params);

  request.post(API_SERVER + path, { form: { 'ajaxargs': JSON.stringify(params)}
  }, function (error, response, body) {
    callback(JSON.parse(body));
  });
}

function addStatic(params) {
  params.space_id = STATIC_PARAMS.space_id;
}
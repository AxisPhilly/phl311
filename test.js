var phl311 = require('./phl311');
var assert = require('assert');

describe('phl311', function() {
  describe('#requests()', function(){
    it('should get a number of requests', function(done){
      phl311.requests({
        'request_status': ['closed'],
        'request_type': 4152,
        'page': 1,
        'limit': 10000
        }, function(resp){
          assert.notEqual(resp.total, 0, 'Request had results');
          done();
        }
      );
    });
  });

  describe('#request()', function(){
    it('should return a single request', function(done){
      phl311.request(71587, function(resp){
        assert.equal(resp.request.id, 71587, 'ID of request matches ID of result');
        done();
      });
    });
  });

  describe('#toGeojson()', function(){
    it('should convert phl311.requests response to GeoJSON', function(done){
      phl311.requests({
        'request_status': ['closed'],
        'request_type': 4152,
        'page': 1,
        'limit': 10000
      }, function(resp) {
        var geojson = phl311.toGeojson(resp.requests);
        assert.equal(resp.total, geojson.features.length, 'GeoJSON has same number of items as resp');
        done();
      }
      );
    });
  });
});
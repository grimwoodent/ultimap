"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletGeocoderStrategy = void 0;

var _nominatimJs = require("nominatim-js");

var _coords = require("../../coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletGeocoderStrategy =
/*#__PURE__*/
function () {
  function LeafletGeocoderStrategy() {
    _classCallCheck(this, LeafletGeocoderStrategy);
  }

  _createClass(LeafletGeocoderStrategy, [{
    key: "whatAt",
    value: function whatAt(coords) {
      return new Promise(function (resolve, reject) {
        var point = new _coords.Coords(coords);

        _nominatimJs.NominatimJS.reverse({
          lat: point.lat,
          lon: point.lng
        }).then(function (res) {
          if (!res) {
            resolve(null);
            return;
          }

          resolve({
            address: res.display_name,
            coords: new _coords.Coords(res.lat, res.lon)
          });
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "whereIs",
    value: function whereIs(address, coords) {
      return new Promise(function (resolve, reject) {
        _nominatimJs.NominatimJS.search({
          q: address,
          addressdetails: 1
        }).then(function (res) {
          var elements = [];
          res.forEach(function (obj) {
            // В описании файла в модуле lng в документации к nominatim lon
            elements.push({
              address: obj.display_name,
              coords: new _coords.Coords(obj.lat, obj.lon)
            });
          });
          resolve(elements[0] || null);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return LeafletGeocoderStrategy;
}();

exports.LeafletGeocoderStrategy = LeafletGeocoderStrategy;
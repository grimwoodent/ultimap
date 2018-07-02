"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexGeocoderStrategy = void 0;

var _ymaps = require("./utils/ymaps");

var _coords = require("../../coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexGeocoderStrategy =
/*#__PURE__*/
function () {
  function YandexGeocoderStrategy() {
    _classCallCheck(this, YandexGeocoderStrategy);
  }

  _createClass(YandexGeocoderStrategy, [{
    key: "whatAt",
    value: function whatAt(coords) {
      return new Promise(function (resolve, reject) {
        if (!_ymaps.Api.ymaps) {
          reject('Yandex maps script not found');
          return;
        } // @TODO implements method


        reject('Method not implemented');
      });
    }
  }, {
    key: "whereIs",
    value: function whereIs(address, coords) {
      return new Promise(function (resolve, reject) {
        if (!_ymaps.Api.ymaps) {
          reject('Yandex maps script not found');
          return;
        }

        var params = {};

        if (coords) {
          var center = new _coords.Coords(coords);
          params.boundedBy = center.getBounds().toArray();
        }

        _ymaps.Api.ymaps.geocode(address, params).then(function (res) {
          if (!res || !res.geoObjects || !res.geoObjects.each) {
            reject('Empty geocoder response');
            return;
          }

          var elements = [];
          res.geoObjects.each(function (obj) {
            elements.push({
              address: obj.properties.get('name'),
              coords: new _coords.Coords(obj.geometry.getCoordinates())
            });
          });
          resolve(elements[0] || null);
        }, function () {
          reject();
        });
      });
    }
  }]);

  return YandexGeocoderStrategy;
}();

exports.YandexGeocoderStrategy = YandexGeocoderStrategy;
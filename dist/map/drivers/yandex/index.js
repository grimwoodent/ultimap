"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexGeoStrategy = void 0;

var _ymaps = require("./utils/ymaps");

var _map = require("./map");

var _geocoder = require("./geocoder");

var _marker = require("./marker");

var _polygon = require("./polygon");

var _geoEvent = require("./geo-event");

var _domEvent = require("./dom-event");

var _mapControl = require("./map-control");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YandexGeoStrategy =
/*#__PURE__*/
function () {
  function YandexGeoStrategy() {
    _classCallCheck(this, YandexGeoStrategy);

    _defineProperty(this, "map", new _map.YandexMapStrategy());

    _defineProperty(this, "marker", new _marker.YandexMarkerStrategy());

    _defineProperty(this, "circle", null);

    _defineProperty(this, "polygon", new _polygon.YandexPolygonStrategy());

    _defineProperty(this, "mapControl", new _mapControl.YandexMapControlStrategy());

    _defineProperty(this, "domEvent", new _domEvent.YandexDOMEventStrategy());

    _defineProperty(this, "geoEvent", new _geoEvent.YandexGeoEventStrategy());

    _defineProperty(this, "preset", {
      marker: null,
      polygon: null
    });

    _defineProperty(this, "geocoder", new _geocoder.YandexGeocoderStrategy());
  }

  _createClass(YandexGeoStrategy, [{
    key: "isAllowed",
    value: function isAllowed() {
      return !!_ymaps.Api.ymaps;
    }
  }]);

  return YandexGeoStrategy;
}();

exports.YandexGeoStrategy = YandexGeoStrategy;
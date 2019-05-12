"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletGeoStrategy = void 0;

var _map = require("./map");

var _marker = require("./marker");

var _marker2 = require("./preset/marker");

var _polygon = require("./polygon");

var _polygon2 = require("./preset/polygon");

var _mapControl = require("./map-control");

var _domEvent = require("./dom-event");

var _geoEvent = require("./geo-event");

var _geocoder = require("./geocoder");

var _circle = require("./circle");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LeafletGeoStrategy =
/*#__PURE__*/
function () {
  function LeafletGeoStrategy(props) {
    _classCallCheck(this, LeafletGeoStrategy);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "marker", new _marker.LeafletMarkerStrategy());

    _defineProperty(this, "polygon", new _polygon.LeafletPolygonStrategy());

    _defineProperty(this, "circle", new _circle.LeafletCircleStrategy());

    _defineProperty(this, "mapControl", new _mapControl.LeafletMapControlStrategy());

    _defineProperty(this, "domEvent", new _domEvent.LeafletDOMEventStrategy());

    _defineProperty(this, "geoEvent", new _geoEvent.LeafletGeoEventStrategy());

    _defineProperty(this, "preset", {
      marker: new _marker2.LeafletMarkerPresetStrategy(),
      polygon: new _polygon2.LeafletPolygonPresetStrategy()
    });

    _defineProperty(this, "geocoder", new _geocoder.LeafletGeocoderStrategy());

    this.initMap(props);
  }

  _createClass(LeafletGeoStrategy, [{
    key: "isAllowed",
    value: function isAllowed() {
      return true;
    }
  }, {
    key: "initMap",
    value: function initMap(props) {
      if (this.map) {
        throw new Error('Map already exist');
      }

      this.map = new _map.LeafletMapStrategy(props);
    }
  }]);

  return LeafletGeoStrategy;
}();

exports.LeafletGeoStrategy = LeafletGeoStrategy;
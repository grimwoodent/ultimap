"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geo = void 0;

var _map = require("./map");

var _leaflet = require("./map/drivers/leaflet");

var _marker = require("./map/marker");

var _marker2 = require("./map/preset/marker");

var _polygon = require("./map/polygon");

var _polygon2 = require("./map/preset/polygon");

var _mapControl = require("./map/map-control");

var _domEvent = require("./map/dom-event");

var _constructor = require("./map/collection/constructor");

var _marker3 = require("./map/collection/strategy/marker");

var _polygon3 = require("./map/collection/strategy/polygon");

var _geoEvent = require("./map/geo-event");

var _geocoder = require("./map/geocoder");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Geo =
/*#__PURE__*/
function () {
  function Geo(strategy) {
    _classCallCheck(this, Geo);

    _defineProperty(this, "Collections", {
      Type: {
        Marker: 'marker',
        Polygon: 'polygon'
      },
      Constructor: _constructor.Constructor,
      Strategy: {
        Marker: _marker3.MarkerStrategy,
        Polygon: _polygon3.PolygonStrategy
      }
    });

    _defineProperty(this, "strategy", void 0);

    this.strategy = strategy || null;
  }
  /**
   * Get the current work strategy.
   *
   * @return {IGeoStrategy}
   */


  _createClass(Geo, [{
    key: "getStrategy",
    value: function getStrategy() {
      if (!this.strategy) {
        this.strategy = new _leaflet.LeafletGeoStrategy();
      }

      return this.strategy;
    }
    /**
     * Set the current work strategy.
     *
     * @param {IGeoStrategy} strategy
     *
     * @return {Geo}
     */

  }, {
    key: "setStrategy",
    value: function setStrategy(strategy) {
      this.strategy = strategy;
      return this;
    }
    /**
     * Create new geo-controller for the strategy.
     *
     * @param {IGeoStrategy} strategy
     *
     * @return {Geo}
     */

  }, {
    key: "byStrategy",
    value: function byStrategy(strategy) {
      return new this.constructor(strategy);
    }
  }, {
    key: "isAllowed",
    value: function isAllowed() {
      return this.getStrategy().isAllowed();
    }
  }, {
    key: "map",
    get: function get() {
      return new _map.Map(this.getStrategy());
    }
  }, {
    key: "marker",
    get: function get() {
      return new _marker.Marker(this.getStrategy());
    }
  }, {
    key: "polygon",
    get: function get() {
      return new _polygon.Polygon(this.getStrategy());
    }
  }, {
    key: "mapControl",
    get: function get() {
      return new _mapControl.MapControl(this.getStrategy());
    }
  }, {
    key: "preset",
    get: function get() {
      return {
        marker: new _marker2.MarkerPreset(this.getStrategy()),
        polygon: new _polygon2.PolygonPreset(this.getStrategy())
      };
    }
  }, {
    key: "domEvent",
    get: function get() {
      return new _domEvent.DOMEvent(this.getStrategy());
    }
  }, {
    key: "event",
    get: function get() {
      return new _geoEvent.GeoEvent(this.getStrategy());
    }
  }, {
    key: "geocoder",
    get: function get() {
      return new _geocoder.Geocoder(this.getStrategy());
    }
  }]);

  return Geo;
}();

exports.Geo = Geo;
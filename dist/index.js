"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Geo", {
  enumerable: true,
  get: function get() {
    return _geo.Geo;
  }
});
Object.defineProperty(exports, "Coords", {
  enumerable: true,
  get: function get() {
    return _coords.Coords;
  }
});
Object.defineProperty(exports, "Bounds", {
  enumerable: true,
  get: function get() {
    return _bounds.Bounds;
  }
});
exports.geo = exports.Strategy = void 0;

var _geo = require("./geo");

var _coords = require("./map/coords");

var _bounds = require("./map/bounds");

var _index = require("./map/drivers/leaflet/index");

var _index2 = require("./map/drivers/yandex/index");

var Strategy = {
  Leaflet: _index.LeafletGeoStrategy,
  Yandex: _index2.YandexGeoStrategy
};
exports.Strategy = Strategy;
var geo = new _geo.Geo();
exports.geo = geo;
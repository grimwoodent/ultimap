"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = void 0;

var _index = require("../map/drivers/leaflet/index");

var _index2 = require("../map/drivers/yandex/index");

var _index3 = require("../map/drivers/google/index");

var Strategy = {
  Leaflet: _index.LeafletGeoStrategy,
  Yandex: _index2.YandexGeoStrategy,
  Google: _index3.GoogleGeoStrategy
};
exports.Strategy = Strategy;
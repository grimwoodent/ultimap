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
Object.defineProperty(exports, "ILatLng", {
  enumerable: true,
  get: function get() {
    return _coords.ILatLng;
  }
});
Object.defineProperty(exports, "IPoint", {
  enumerable: true,
  get: function get() {
    return _coords.IPoint;
  }
});
Object.defineProperty(exports, "PolygonCoords", {
  enumerable: true,
  get: function get() {
    return _polygonCoords.PolygonCoords;
  }
});
Object.defineProperty(exports, "Bounds", {
  enumerable: true,
  get: function get() {
    return _bounds.Bounds;
  }
});
Object.defineProperty(exports, "IMarker", {
  enumerable: true,
  get: function get() {
    return _marker.IMarker;
  }
});
Object.defineProperty(exports, "Marker", {
  enumerable: true,
  get: function get() {
    return _marker.Marker;
  }
});
Object.defineProperty(exports, "IPolygon", {
  enumerable: true,
  get: function get() {
    return _polygon.IPolygon;
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function get() {
    return _polygon.Polygon;
  }
});
Object.defineProperty(exports, "IMap", {
  enumerable: true,
  get: function get() {
    return _index3.IMap;
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _index3.Map;
  }
});
Object.defineProperty(exports, "IIcon", {
  enumerable: true,
  get: function get() {
    return _icon.IIcon;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _icon.Icon;
  }
});
Object.defineProperty(exports, "IGeocoder", {
  enumerable: true,
  get: function get() {
    return _geocoder.IGeocoder;
  }
});
Object.defineProperty(exports, "Geocoder", {
  enumerable: true,
  get: function get() {
    return _geocoder.Geocoder;
  }
});
Object.defineProperty(exports, "IGeoEvent", {
  enumerable: true,
  get: function get() {
    return _geoEvent.IGeoEvent;
  }
});
Object.defineProperty(exports, "GeoEvent", {
  enumerable: true,
  get: function get() {
    return _geoEvent.GeoEvent;
  }
});
Object.defineProperty(exports, "IDOMEvent", {
  enumerable: true,
  get: function get() {
    return _domEvent.IDOMEvent;
  }
});
Object.defineProperty(exports, "DOMEvent", {
  enumerable: true,
  get: function get() {
    return _domEvent.DOMEvent;
  }
});
exports.geo = exports.Strategy = void 0;

var _geo = require("./geo");

var _coords = require("./map/coords");

var _polygonCoords = require("./map/polygon-coords");

var _bounds = require("./map/bounds");

var _index = require("./map/drivers/leaflet/index");

var _index2 = require("./map/drivers/yandex/index");

var _marker = require("./map/marker");

var _polygon = require("./map/polygon");

var _index3 = require("./map/index");

var _icon = require("./map/icon");

var _geocoder = require("./map/geocoder");

var _geoEvent = require("./map/geo-event");

var _domEvent = require("./map/dom-event");

var Strategy = {
  Leaflet: _index.LeafletGeoStrategy,
  Yandex: _index2.YandexGeoStrategy
};
exports.Strategy = Strategy;
var geo = new _geo.Geo();
exports.geo = geo;
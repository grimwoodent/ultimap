"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleGeoStrategy = void 0;

var _google = require("./utils/google");

var _map = require("./map");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { GoogleGeocoderStrategy } from './geocoder';
// import { GoogleMarkerStrategy } from './marker';
// import { GooglePolygonStrategy } from './polygon';
// import { GoogleGeoEventStrategy } from './geo-event';
// import { GoogleDOMEventStrategy } from './dom-event';
// import { GoogleMapControlStrategy } from './map-control';
var GoogleGeoStrategy =
/*#__PURE__*/
function () {
  function GoogleGeoStrategy() {
    _classCallCheck(this, GoogleGeoStrategy);

    _defineProperty(this, "map", new _map.GoogleMapStrategy());

    _defineProperty(this, "marker", null);

    _defineProperty(this, "polygon", null);

    _defineProperty(this, "mapControl", null);

    _defineProperty(this, "domEvent", null);

    _defineProperty(this, "geoEvent", null);

    _defineProperty(this, "preset", {
      marker: null,
      polygon: null
    });

    _defineProperty(this, "geocoder", null);
  }

  _createClass(GoogleGeoStrategy, [{
    key: "isAllowed",
    value: function isAllowed() {
      return !!_google.Api.google;
    }
  }]);

  return GoogleGeoStrategy;
}();

exports.GoogleGeoStrategy = GoogleGeoStrategy;
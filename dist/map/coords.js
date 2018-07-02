"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coords = void 0;

var _bounds = require("./bounds");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Coords =
/*#__PURE__*/
function () {
  function Coords(lat, lng) {
    _classCallCheck(this, Coords);

    _defineProperty(this, "lat", null);

    _defineProperty(this, "lng", null);

    if (Array.isArray(lat)) {
      this.lat = parseFloat(lat[0]);
      this.lng = parseFloat(lat[1]);
    } else if (_typeof(lat) === 'object') {
      this.lat = parseFloat(lat.lat);
      this.lng = parseFloat(lat.lng);
    } else {
      this.lat = parseFloat(lat);
      this.lng = parseFloat(lng);
    }

    if (isNaN(this.lat) || typeof this.lat !== 'number' || isNaN(this.lng) || typeof this.lng !== 'number') {
      throw new Error('Coords parse error');
    }
  }

  _createClass(Coords, [{
    key: "toArray",
    value: function toArray() {
      return [this.lat, this.lng];
    }
  }, {
    key: "toLatLng",
    value: function toLatLng() {
      return {
        lat: this.lat,
        lng: this.lng
      };
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return {
        x: this.lat,
        y: this.lng
      };
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var center = this.toArray();
      return new _bounds.Bounds(center, center);
    }
  }]);

  return Coords;
}();

exports.Coords = Coords;
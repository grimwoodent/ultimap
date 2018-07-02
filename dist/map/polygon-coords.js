"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonCoords = void 0;

var _bounds = require("./bounds");

var _polygonCoords = require("./utils/polygon-coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PolygonCoords =
/*#__PURE__*/
function () {
  // @TODO Сделать возможность создания по объектам Coords
  function PolygonCoords(points) {
    _classCallCheck(this, PolygonCoords);

    _defineProperty(this, "points", null);

    this.points = _polygonCoords.UtilsPolygonCoords.toNumbers(points);
  }
  /**
   * Привести в массив
   *
   * @param {boolean} normalize Нормализировать объект к виду вложенности 3
   *
   * @return {tPolygonCoords}
   */


  _createClass(PolygonCoords, [{
    key: "toArray",
    value: function toArray() {
      var normalize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (normalize) {
        return _polygonCoords.UtilsPolygonCoords.normalize(this.points);
      }

      return this.points;
    }
  }, {
    key: "toJson",
    value: function toJson() {
      var normalize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.getCount()) {
        console.error('Empty polygon coords');

        if (normalize) {
          return '[[[]]]';
        }

        return JSON.stringify(this.points || []);
      }

      return JSON.stringify(this.toArray(normalize));
    }
  }, {
    key: "getCount",
    value: function getCount() {
      return _polygonCoords.UtilsPolygonCoords.count(this.points);
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var points = {
        left: null,
        right: null,
        bottom: null,
        top: null
      };

      _polygonCoords.UtilsPolygonCoords.simplify(this.points).forEach(function (point) {
        var coords = Array.isArray(point[0]) ? point[0] : point;
        var lat = coords[0];
        var lng = coords[1];
        points.left = points.left === null || lat < points.left ? lat : points.left;
        points.right = points.right === null || lat > points.right ? lat : points.right;
        points.bottom = points.bottom === null || lng < points.bottom ? lng : points.bottom;
        points.top = points.top === null || lng > points.top ? lng : points.top;
      });

      return new _bounds.Bounds([points.left, points.top], [points.right, points.bottom]);
    }
  }]);

  return PolygonCoords;
}();

exports.PolygonCoords = PolygonCoords;
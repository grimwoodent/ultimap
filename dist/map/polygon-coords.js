"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonCoords = void 0;

var _concaveman = _interopRequireDefault(require("concaveman"));

var _quickHull2d = _interopRequireDefault(require("quick-hull-2d"));

var _simplifyJs = _interopRequireDefault(require("simplify-js"));

var _bounds = require("./bounds");

var _polygonCoords = require("./utils/polygon-coords");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PolygonCoords =
/*#__PURE__*/
function () {
  _createClass(PolygonCoords, null, [{
    key: "createByConcaveHull",
    value: function createByConcaveHull(points) {
      return new this((0, _concaveman.default)(points));
    }
  }, {
    key: "createByConvexHull",
    value: function createByConvexHull(points) {
      return new this((0, _quickHull2d.default)(points));
    }
  }]);

  function PolygonCoords(points) {
    _classCallCheck(this, PolygonCoords);

    _defineProperty(this, "points", null);

    this.points = _polygonCoords.UtilsPolygonCoords.toNumbers(points);
  }
  /**
   * Привести в массив
   *
   * @return {tPolygonCoords}
   */


  _createClass(PolygonCoords, [{
    key: "toArray",
    value: function toArray() {
      return this.points;
    }
    /**
     * Нормализировать объект к виду вложенности 3
     *
     * @return {tPolygonCoords | tPolygonCoords[]}
     */

  }, {
    key: "toNormalizeArray",
    value: function toNormalizeArray() {
      return _polygonCoords.UtilsPolygonCoords.normalize(this.points);
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

      return JSON.stringify(normalize ? this.toNormalizeArray() : this.toArray());
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
    /**
     * Reduce number of point for Polygon
     * @param {number} tolerance
     * @param {boolean} highQuality
     */

  }, {
    key: "toSimplified",
    value: function toSimplified(tolerance, highQuality) {
      var rowPoints = this.toNormalizeArray()[0];
      rowPoints.pop();
      var points = rowPoints.map(function (point) {
        return {
          x: point[0],
          y: point[1]
        };
      });
      var simplified = (0, _simplifyJs.default)(points, tolerance, highQuality);
      return new this.constructor([simplified.map(function (point) {
        return [point.x, point.y];
      })]);
    }
  }]);

  return PolygonCoords;
}();

exports.PolygonCoords = PolygonCoords;
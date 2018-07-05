"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilsPolygonCoords = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UtilsPolygonCoords =
/*#__PURE__*/
function () {
  function UtilsPolygonCoords() {
    _classCallCheck(this, UtilsPolygonCoords);
  }

  _createClass(UtilsPolygonCoords, null, [{
    key: "isSimpleCoords",

    /**
     * Является ли объект простой координатой в виде массива
     *
     * @param coords
     *
     * @return {boolean}
     */
    value: function isSimpleCoords(coords) {
      if (!coords || !Array.isArray(coords)) {
        return false;
      }

      var isCoord0 = typeof coords[0] === 'number' || typeof coords[0] === 'string';
      var isCoord1 = typeof coords[1] === 'number' || typeof coords[1] === 'string';
      return isCoord0 && isCoord1;
    }
    /**
     * Является ли объект простой координатой
     *
     * @param coords
     *
     * @return {boolean}
     */

  }, {
    key: "isLatLng",
    value: function isLatLng(coords) {
      if (!coords || _typeof(coords) !== 'object') {
        return false;
      }

      return coords.hasOwnProperty('lat') && coords.hasOwnProperty('lng');
    }
    /**
     * Привести в формат объекта
     *
     * @param {tSimpleCoords | coordsArrays} coords
     *
     * @return {ILatLng | latLngArrays}
     */

  }, {
    key: "toLatLng",
    value: function toLatLng(coords) {
      var _this = this;

      if (this.isLatLng(coords)) {
        return coords;
      }

      if (!coords || !Array.isArray(coords)) {
        return null;
      }

      if (this.isSimpleCoords(coords)) {
        return {
          lat: coords[0],
          lng: coords[1]
        };
      }

      return coords.map(function (coord) {
        return _this.toLatLng(coord);
      }).filter(function (coord) {
        return !!coord;
      });
    }
    /**
     * Приветси координаты в формат чисел
     *
     * @param {ILatLng | latLngArrays} coords
     *
     * @return {tSimpleCoords | coordsArrays}
     */

  }, {
    key: "toNumbers",
    value: function toNumbers(coords) {
      var _this2 = this;

      if (this.isSimpleCoords(coords)) {
        return coords;
      }

      if (!coords) {
        return null;
      }

      if (this.isLatLng(coords)) {
        return [coords.lat, coords.lng];
      }

      if (Array.isArray(coords)) {
        return coords.map(function (coord) {
          return _this2.toNumbers(coord);
        }).filter(function (coord) {
          return !!coord;
        });
      }

      return null;
    }
    /**
     * Сравнить двое координат
     *
     * @param {tSimpleCoords | ILatLng} coords1
     * @param {tSimpleCoords | ILatLng} coords2
     *
     * @return {boolean}
     */

  }, {
    key: "equals",
    value: function equals(coords1, coords2) {
      var c1 = this.toLatLng(coords1);
      var c2 = this.toLatLng(coords2);

      if (!c1 || !c2) {
        return false;
      }

      return c1.lat === c2.lat && c1.lng === c2.lng;
    }
    /**
     * Привести координаты к массиву простых координат
     *
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     *
     * @return {simplifed}
     */

  }, {
    key: "simplify",
    value: function simplify(coords) {
      var _this3 = this;

      if (!coords) {
        return [];
      }

      if (this.isSimpleCoords(coords) || this.isLatLng(coords)) {
        return [coords];
      }

      if (!Array.isArray(coords)) {
        return [];
      }

      return coords.reduce(function (p, c) {
        var r = _this3.simplify(c);

        if (!r) {
          return p;
        }

        return p.concat(r);
      }, []);
    }
    /**
     * Количество точек
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     * @return {number}
     */

  }, {
    key: "count",
    value: function count(coords) {
      var _this4 = this;

      if (this.isSimpleCoords(coords)) {
        return 1;
      }

      if (this.isLatLng(coords)) {
        return 1;
      }

      if (!coords || !Array.isArray(coords)) {
        return 0;
      }

      return coords.reduce(function (p, c) {
        return p + _this4.count(c);
      }, 0);
    }
    /**
     * Получить глубину вложенности координат
     *
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     * @param {number} deep
     *
     * @return {number}
     */

  }, {
    key: "deep",
    value: function deep(coords) {
      var _this5 = this;

      var _deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.isSimpleCoords(coords)) {
        return 1;
      }

      if (this.isLatLng(coords)) {
        return 1;
      }

      if (!coords || !Array.isArray(coords)) {
        return 0;
      }

      return coords.reduce(function (p, c) {
        var d = _this5.deep(c, _deep + 1);

        return p > d + 1 ? p : d + 1;
      }, 0);
    }
  }, {
    key: "normalize",
    value: function normalize(value) {
      var _this6 = this;

      var coords = this.toNumbers(value);
      var deep = this.deep(coords);
      var normalized;

      switch (deep) {
        case 0:
          normalized = [[[]]];
          break;

        case 1:
          normalized = [[coords]];
          break;

        case 2:
          normalized = [coords];
          break;

        case 3:
          normalized = coords;
          break;

        default:
          throw new Error('Points is too deep');
      }

      normalized.forEach(function (arr) {
        var e = arr[0];
        var last = arr[arr.length - 1];

        if (_this6.isSimpleCoords(e) || _this6.isLatLng(e)) {
          if (arr.length > 1) {
            if (!_this6.equals(e, last)) {
              arr.push(e);
            }
          } else {
            arr.push(e);
          }
        }
      });
      return normalized;
    }
  }]);

  return UtilsPolygonCoords;
}();

exports.UtilsPolygonCoords = UtilsPolygonCoords;
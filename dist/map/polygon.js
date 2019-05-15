"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polygon = void 0;

var _geoobject = require("./geoobject");

var _polygonCoords = require("./polygon-coords");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Polygon =
/*#__PURE__*/
function (_GeoObject) {
  _inherits(Polygon, _GeoObject);

  function Polygon() {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Polygon).apply(this, arguments));
  }

  _createClass(Polygon, [{
    key: "updateProperties",
    value: function updateProperties(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        Promise.all([_this.setData((options || {}).data), _this.setStyle(options), _this.setPreset((options || {}).preset), _this.setEditable((options || {}).editable)]).then(function () {
          resolve(_this);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Копировать объект
     *
     * @return {IPolygon}
     */

  }, {
    key: "clone",
    value: function clone() {
      var clone = new this.constructor(this.strategy);
      return clone.create(this.coords.toArray(), {
        data: this.data,
        preset: this.props.preset,
        editable: this.props.editable,
        // @TODO Подумать над более красивым решением
        fillColor: this.props.fillColor,
        fillOpacity: this.props.fillOpacity,
        strokeColor: this.props.strokeColor,
        strokeOpacit: this.props.strokeOpacity,
        strokeWidth: this.props.strokeWidth
      });
    }
    /**
     * Установить стили для полигона
     *
     * @param {IUpdatePolygonStyle} value
     *
     * @return {Promise<IPolygon>}
     */

  }, {
    key: "setStyle",
    value: function setStyle(value) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this2);
          return;
        } // @TODO Подумать над более красивым решением


        _this2.props.fillColor = value.fillColor || _this2.props.fillColor;
        _this2.props.fillOpacity = value.fillOpacity || _this2.props.fillOpacity;
        _this2.props.strokeColor = value.strokeColor || _this2.props.strokeColor;
        _this2.props.strokeOpacity = value.strokeOpacity || _this2.props.strokeOpacity;
        _this2.props.strokeWidth = value.strokeWidth || _this2.props.strokeWidth;

        if (_this2.hasInstance()) {
          _this2.getStrategy().setStyle(_this2.getInstance(), _this2.props);

          resolve(_this2);
        } else {
          resolve(_this2);
        }
      });
    }
    /**
     * Установить пресет
     * @param {string} value
     * @return {Promise<IPolygon>}
     */

  }, {
    key: "setPreset",
    value: function setPreset(value) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this3);
          return;
        }

        _this3.props.preset = value;

        if (_this3.hasInstance()) {
          _this3.getStrategy().setPreset(_this3.getInstance(), _this3.props.preset);

          resolve(_this3);
        } else {
          resolve(_this3);
        }

        resolve(_this3);
      });
    }
    /**
     * Получить местоположение объекта
     * @param {boolean} byInstance
     * @return {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getBounds(this.getInstance());
      }

      return this.getCoords(false).getBounds();
    }
    /**
     * Начать рисовать полигон
     *
     * @param {boolean} value
     *
     * @return {Promise<IPolygon>}
     */

  }, {
    key: "setDrawing",
    value: function setDrawing(value) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (!_this4.hasInstance()) {
          resolve(_this4);
          return;
        }

        if (value) {
          _this4.setEditable(true).then(function () {
            _this4.getStrategy().setDrawing(_this4.getInstance(), value);

            resolve(_this4);
          }, reject);

          return;
        }

        _this4.setEditable(false).then(resolve, reject);
      });
    }
    /**
     * Стратегия работы с полигоном
     * @return {IPolygonStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      if (!this.strategy) {
        throw new Error('Geo strategy not found');
      }

      return this.strategy.polygon;
    }
  }]);

  return Polygon;
}(_geoobject.GeoObject);

exports.Polygon = Polygon;

_defineProperty(Polygon, "Coords", _polygonCoords.PolygonCoords);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Marker = void 0;

var _coords = require("./coords");

var _icon = require("./icon");

var _geoobject = require("./geoobject");

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

var Marker =
/*#__PURE__*/
function (_GeoObject) {
  _inherits(Marker, _GeoObject);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).apply(this, arguments));
  }

  _createClass(Marker, [{
    key: "updateProperties",

    /**
     * Обновить параметры метки
     *
     * @param {IUpdateMarkerProperties} options
     *
     * @return {Promise<IMarker>}
     */
    value: function updateProperties(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        Promise.all([_this.setData((options || {}).data), _this.setIcon((options || {}).icon), _this.setPreset((options || {}).preset), _this.setEditable((options || {}).editable)]).then(function () {
          resolve(_this);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Копировать объект
     *
     * @return {IMarker}
     */

  }, {
    key: "clone",
    value: function clone() {
      var clone = new this.constructor(this.strategy);
      return clone.create(this.coords.toArray(), {
        data: this.data,
        icon: this.props.icon ? this.props.icon.toObject() : undefined,
        preset: this.props.preset,
        editable: this.props.editable
      });
    }
    /**
     * Установить иконку
     *
     * @param {IIcon} value
     *
     * @return {IMarker}
     */

  }, {
    key: "setIcon",
    value: function setIcon(value) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this2);
          return;
        }

        _this2.props.icon = new _icon.Icon(value);

        if (_this2.hasInstance()) {
          _this2.getStrategy().setIcon(_this2.getInstance(), _this2.props.icon);

          resolve(_this2);
        } else {
          resolve(_this2);
        }

        resolve(_this2);
      });
    }
    /**
     * Установить стили из хранилища
     *
     * @param {string} value
     *
     * @return {Promise<IMarker>}
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
     * Получить координаты объекта
     *
     * @param {boolean} byInstance
     *
     * @return {Coords}
     */

  }, {
    key: "getCoords",
    value: function getCoords() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getCoords(this.getInstance());
      }

      return this.coords || null;
    }
    /**
     * Получит местоположение
     *
     * @param {boolean} byInstance
     *
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
     * Стратегия работы с маркером
     * @return {IMarkerStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      return this.strategy.marker;
    }
  }]);

  return Marker;
}(_geoobject.GeoObject);

exports.Marker = Marker;

_defineProperty(Marker, "Coords", _coords.Coords);
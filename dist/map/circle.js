"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = void 0;

var _geoobject = require("./geoobject");

var _coords = require("./coords");

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

var Circle =
/*#__PURE__*/
function (_GeoObject) {
  _inherits(Circle, _GeoObject);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).apply(this, arguments));
  }

  _createClass(Circle, [{
    key: "updateProperties",

    /**
     * Update circle properties
     * @param {IUpdateCircleProperties} options
     * @returns {Promise<IEvented<IUpdateCircleProperties>>}
     */
    value: function updateProperties(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        Promise.all([_this.setData((options || {}).data), _this.setRadius((options || {}).radius), _this.setStyle(options), _this.setEditable((options || {}).editable)]).then(function () {
          resolve(_this);
        }, function (message) {
          reject(message);
        });
      });
    }
  }, {
    key: "setRadius",
    value: function setRadius(radius) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (radius === undefined) {
          resolve(_this2);
          return;
        }

        _this2.props.radius = radius;

        if (_this2.hasInstance()) {
          _this2.getStrategy().setRadius(_this2.getInstance(), radius);

          resolve(_this2);
        } else {
          resolve(_this2);
        }
      });
    }
  }, {
    key: "getRadius",
    value: function getRadius() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getRadius(this.getInstance());
      }

      return this.props.radius;
    }
    /**
     * Clone object with all properties
     * @returns {IGeoObject<tCoords, IUpdateCircleProperties>}
     */

  }, {
    key: "clone",
    value: function clone() {
      var clone = new this.constructor(this.strategy);
      return clone.create(this.coords.toArray(), {
        data: this.data,
        radius: this.props.radius,
        // @TODO Подумать над более красивым решением
        fillColor: this.props.fillColor,
        fillOpacity: this.props.fillOpacity,
        strokeColor: this.props.strokeColor,
        strokeOpacit: this.props.strokeOpacity,
        strokeWidth: this.props.strokeWidth
      });
    }
  }, {
    key: "setStyle",
    value: function setStyle(value) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this3);
          return;
        } // @TODO Подумать над более красивым решением


        _this3.props.fillColor = value.fillColor || _this3.props.fillColor;
        _this3.props.fillOpacity = value.fillOpacity || _this3.props.fillOpacity;
        _this3.props.strokeColor = value.strokeColor || _this3.props.strokeColor;
        _this3.props.strokeOpacity = value.strokeOpacity || _this3.props.strokeOpacity;
        _this3.props.strokeWidth = value.strokeWidth || _this3.props.strokeWidth;

        if (_this3.hasInstance()) {
          _this3.getStrategy().setStyle(_this3.getInstance(), _this3.props);

          resolve(_this3);
        } else {
          resolve(_this3);
        }
      });
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getBounds(this.getInstance());
      }

      return this.getCoords(false).getBounds();
    }
  }, {
    key: "getStrategy",
    value: function getStrategy() {
      if (!this.strategy) {
        throw new Error('Geo strategy not found');
      }

      return this.strategy.circle;
    }
  }]);

  return Circle;
}(_geoobject.GeoObject);

exports.Circle = Circle;

_defineProperty(Circle, "Coords", _coords.Coords);
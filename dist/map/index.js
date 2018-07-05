"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = void 0;

var _coords = require("./coords");

var _bounds = require("./bounds");

var _evented = require("./evented");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Компонент обертка для работы с картой по установленной стратегии
 */
var Map =
/*#__PURE__*/
function (_Evented) {
  _inherits(Map, _Evented);

  function Map() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, Map);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Map)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "holder", void 0), _temp));
  }

  _createClass(Map, [{
    key: "updateProperties",

    /**
     * Обновить параметры карты
     * @param {IUpdateMapProperties} options
     * @return {IMap}
     */
    value: function updateProperties(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        Promise.all([_this2.setCenter((options || {}).center), _this2.setZoom((options || {}).zoom), _this2.setBounds((options || {}).bounds)]).then(function () {
          resolve(_this2);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Создать экземпляр карты в элементе
     *
     * @param {HTMLElement} holder
     * @param {IUpdateMapProperties} options
     *
     * @return {IMap}
     */

  }, {
    key: "create",
    value: function create(holder, options) {
      if (this.holder) {
        console.warn('Try to recreate map');
        return this;
      }

      this.holder = holder;
      this.updateProperties(options);
      return this;
    }
    /**
     * Загрузить карту
     * @return {Promise<IMap>}
     */

  }, {
    key: "load",
    value: function load() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (_this3.hasInstance()) {
          resolve(_this3);
          return;
        }

        if (!_this3.holder) {
          reject('Holder not found');
          return;
        } // @TODO set events for new instance


        _this3.getStrategy().load(_this3.holder, _this3.props).then(function (instance) {
          _this3.instance = instance;
          resolve(_this3);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Уничтожить карту
     * @return {Promise<IMap>}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (!_this4.hasInstance()) {
          resolve(_this4);
          return;
        }

        _this4.getStrategy().destroy(_this4.getInstance()).then(function () {
          _this4.instance = null;
          resolve(_this4);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Установить значение центра карты
     * @param {tCoords} latlng
     * @return {IMap}
     */

  }, {
    key: "setCenter",
    value: function setCenter(latlng) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (latlng === undefined) {
          resolve(_this5);
          return;
        }

        _this5.props.center = new _coords.Coords(latlng);

        if (_this5.hasInstance()) {
          _this5.getStrategy().setCenter(_this5.getInstance(), _this5.props.center).then(function () {
            resolve(_this5);
          }, reject);
        } else {
          resolve(_this5);
        }
      });
    }
    /**
     * Получить значение центра карты
     * @param {boolean} byInstance
     * @return {Coords}
     */

  }, {
    key: "getCenter",
    value: function getCenter() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getCenter(this.getInstance());
      }

      return this.props.center || null;
    }
    /**
     * Установить текущее значение зума
     *
     * @param {number} value
     *
     * @return {IMap}
     */

  }, {
    key: "setZoom",
    value: function setZoom(value) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this6);
          return;
        }

        _this6.props.zoom = value;

        if (_this6.hasInstance()) {
          _this6.getStrategy().setZoom(_this6.getInstance(), _this6.props.zoom).then(function () {
            resolve(_this6);
          }, reject);
        } else {
          resolve(_this6);
        }
      });
    }
    /**
     * Получить текущее значение зума
     * @return {number}
     */

  }, {
    key: "getZoom",
    value: function getZoom() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getZoom(this.getInstance());
      }

      return this.props.zoom || null;
    }
    /**
     * Установить область отображения карты
     * @param {tCoords | [tCoords , tCoords]} corner1
     * @param {tCoords} corner2
     * @return {Promise<IMap>}
     */

  }, {
    key: "setBounds",
    value: function setBounds(corner1, corner2) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        if (corner1 === undefined) {
          resolve(_this7);
          return;
        }

        _this7.props.bounds = new _bounds.Bounds(corner1, corner2);

        if (_this7.hasInstance()) {
          _this7.getStrategy().setBounds(_this7.getInstance(), _this7.props.bounds).then(function () {
            resolve(_this7);
          }, reject);
        } else {
          resolve(_this7);
        }
      });
    }
    /**
     * Получить область отображения карты
     * @return {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      var byInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (byInstance) {
        return this.getStrategy().getBounds(this.getInstance());
      }

      return this.props.bounds || null;
    }
    /**
     * Получить элемент карты для работы со стратегиями
     * @return {any}
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      if (!this.hasInstance()) {
        throw new Error('Map instance not found');
      }

      return this.instance;
    }
    /**
     * Обновить размер карты под размер контейнера
     *
     * @return {Promise<IMap>}
     */

  }, {
    key: "fitToViewport",
    value: function fitToViewport() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        if (_this8.hasInstance()) {
          _this8.getStrategy().fitToViewport(_this8.getInstance()).then(function () {
            resolve(_this8);
          }, reject);
        } else {
          resolve(_this8);
        }
      });
    }
    /**
     * Добавить элемент управления на карту
     *
     * @param control
     *
     * @return {IMap}
     */

  }, {
    key: "addControl",
    value: function addControl(control) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        if (_this9.hasInstance()) {
          _this9.getStrategy().addControl(_this9.getInstance(), control).then(function () {
            resolve(_this9);
          }, reject);
        } else {
          resolve(_this9);
        }
      });
    }
    /**
     * Стратегия работы с картой
     * @return {IMapStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      return this.strategy.map;
    }
  }]);

  return Map;
}(_evented.Evented);

exports.Map = Map;
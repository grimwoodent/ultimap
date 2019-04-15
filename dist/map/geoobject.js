"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoObject = void 0;

var _evented = require("./evented");

var _index = require("./utils/index");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GeoObject =
/*#__PURE__*/
function (_Evented) {
  _inherits(GeoObject, _Evented);

  function GeoObject(strategy) {
    var _this;

    _classCallCheck(this, GeoObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GeoObject).call(this, strategy));

    _defineProperty(_assertThisInitialized(_this), "map", void 0);

    _defineProperty(_assertThisInitialized(_this), "coords", void 0);

    _defineProperty(_assertThisInitialized(_this), "data", {});

    _this.data.uid = _index.uid.next();
    _this.data.name = '';
    return _this;
  }
  /**
   * Создаем новый экземпляр с параметрами
   *
   * @param {TCoordsForUpdate} coords
   * @param {TPropertiesForUpdate} options
   *
   * @return {any}
   */


  _createClass(GeoObject, [{
    key: "create",
    value: function create(coords, options) {
      this.setCoords(coords);
      this.updateProperties(options);
      return this;
    }
    /**
     * Получить уникальный ключ объекта
     *
     * @return {string}
     */

  }, {
    key: "getUid",
    value: function getUid() {
      return this.getData().uid;
    }
    /**
     * Получить элемент для работы со стратегиями
     *
     * @return {any}
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      var createNewInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.hasInstance()) {
        return this.instance;
      }

      if (!createNewInstance) {
        throw new Error('Instance not found');
      } // set events for new instance in addTo method


      this.instance = this.getStrategy().create(this.coords, this.props);
      return this.instance;
    }
    /**
     * Установить координаты геообъекта
     *
     * @return {Promise<IGeoObject>}
     */

  }, {
    key: "setCoords",
    value: function setCoords(value) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this2);
          return;
        }

        _this2.coords = new _this2.constructor.Coords(value);

        if (_this2.hasInstance()) {
          _this2.getStrategy().setCoords(_this2.getInstance(), _this2.coords);

          resolve(_this2);
        } else {
          resolve(_this2);
        }
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
    key: "addTo",

    /**
     * Установить объект на карту
     *
     * @param {Map} map
     *
     * @return {IGeoObject}
     */
    value: function addTo(map) {
      if (this.onMap()) {
        this.remove();
      }

      this.getStrategy().addToMap(this.getInstance(true), map);
      this.map = map; // Обновим параметры которые нельзя выставить напрямую через создание или которые работают только на карте

      this.events.resetAll();
      this.setEditable(this.props.editable || false);
      return this;
    }
    /**
     * Удалить геообъект с карты
     *
     * @return {IGeoObject}
     */

  }, {
    key: "remove",
    value: function remove() {
      if (this.onMap()) {
        this.events.removeAll();
        this.getStrategy().removeFromMap(this.getInstance(), this.getMap());
        this.map = null;
      }

      return this;
    }
    /**
     * Получить текущую карту
     *
     * @return {Map}
     */

  }, {
    key: "getMap",
    value: function getMap() {
      return this.map || null;
    }
    /**
     * Находится ли объект на карте
     *
     * @return {boolean}
     */

  }, {
    key: "onMap",
    value: function onMap() {
      return !!this.getMap() && this.hasInstance();
    }
    /**
     * Копировать текущий объект
     * @return {IGeoObject<TCoordsForUpdate, TPropertiesForUpdate extends IUpdateGeoObjectOptions>}
     */

  }, {
    key: "setEditable",

    /**
     * Установить состояние редактирования
     *
     * @param {boolean} value
     *
     * @return {Promise<IGeoObject>}
     */
    value: function setEditable(value) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this3);
          return;
        }

        _this3.props.editable = value;

        if (_this3.hasInstance()) {
          _this3.getStrategy().setEditable(_this3.getInstance(), _this3.props.editable);

          resolve(_this3);
        } else {
          resolve(_this3);
        }
      });
    }
  }, {
    key: "setData",
    value: function setData(value) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (value === undefined) {
          resolve(_this4);
          return;
        }

        _this4.data = Object.assign(_this4.data || {}, value);
        resolve(_this4);
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data || {};
    }
    /**
     * Стратегия работы с геообъектом
     * @return {IEditableGeoObjectStrategy}
     */

  }]);

  return GeoObject;
}(_evented.Evented);

exports.GeoObject = GeoObject;

_defineProperty(GeoObject, "Coords", null);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexMapStrategy = void 0;

var _ymaps = require("./utils/ymaps");

var _coords = require("../../coords");

var _bounds = require("../../bounds");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexMapStrategy =
/*#__PURE__*/
function () {
  function YandexMapStrategy() {
    _classCallCheck(this, YandexMapStrategy);
  }

  _createClass(YandexMapStrategy, [{
    key: "load",

    /**
     * Load map to element
     * @param {HTMLElement} element
     * @param {ICreateMapStrategyOptions} options
     * @return {Promise<any>}
     */
    value: function load(element, options) {
      return new Promise(function (resolve, reject) {
        if (!_ymaps.Api.ymaps) {
          reject('Yandex maps script not found');
          return;
        }

        _ymaps.Api.ymaps.ready(function () {
          // @TODO options
          var instance = new _ymaps.Api.ymaps.Map(element, {
            center: options.center ? options.center.toArray() : null,
            bounds: options.bounds ? options.bounds.toArray() : null,
            zoom: options.zoom
          });
          resolve(instance);
        }, function (message) {
          reject(message);
        });
      });
    }
    /**
     * Destroy map instance
     *
     * @param {Map} map
     *
     * @return {Promise<IMapStrategy>}
     */

  }, {
    key: "destroy",
    value: function destroy(map) {
      var _this = this;

      return new Promise(function (resolve) {
        map.destroy();
        resolve(_this);
      });
    }
    /**
     * Установить центр для карты
     *
     * @param {Map} map
     * @param {Coords} coords
     *
     * @return {IMapStrategy}
     */

  }, {
    key: "setCenter",
    value: function setCenter(map, coords) {
      var _this2 = this;

      return new Promise(function (resolve) {
        map.setCenter(coords.toArray()).then(function () {
          resolve(_this2);
        });
      });
    }
    /**
     * Получить значение центра для карты
     *
     * @param {Map} map
     *
     * @return {Coords}
     */

  }, {
    key: "getCenter",
    value: function getCenter(map) {
      var center = map.getCenter();
      return new _coords.Coords(center);
    }
    /**
     * Установить текущее занчение зума
     * @param {Map} map
     * @param {number} value
     * @return {IMapStrategy}
     */

  }, {
    key: "setZoom",
    value: function setZoom(map, value) {
      var _this3 = this;

      return new Promise(function (resolve) {
        // @TODO listen event for complete
        map.setZoom(value);
        resolve(_this3);
      });
    }
    /**
     * Получить текущее значение зума
     * @param {Map} map
     * @return {number}
     */

  }, {
    key: "getZoom",
    value: function getZoom(map) {
      return map.getZoom();
    }
    /**
     * Установить область отображения карты
     * @param map
     * @param {Bounds} value
     * @return {IMapStrategy}
     */

  }, {
    key: "setBounds",
    value: function setBounds(map, value) {
      var _this4 = this;

      return new Promise(function (resolve) {
        map.setBounds(value.toArray()).then(function () {
          resolve(_this4);
        });
      });
    }
    /**
     * Получить область отображения карты
     * @return {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds(map) {
      var bounds = map.getBounds();
      return new _bounds.Bounds(bounds);
    }
    /**
     * Обновить отображаемую область
     * @param {Map} map
     * @return {Promise<IMapStrategy>}
     */

  }, {
    key: "fitToViewport",
    value: function fitToViewport(map) {
      var _this5 = this;

      return new Promise(function (resolve) {
        map.container.fitToViewport();
        resolve(_this5);
      });
    }
    /**
     * Добавить элемент управления на карту
     *
     * @param map
     * @param control
     *
     * @return {Promise<IMapStrategy>}
     */

  }, {
    key: "addControl",
    value: function addControl(map, control) {
      var _this6 = this;

      return new Promise(function (resolve) {
        map.controls.add(control);
        resolve(_this6);
      });
    }
    /**
     * Remove control from map
     * @param map
     * @param control
     * @return {Promise<IMapStrategy>}
     */

  }, {
    key: "removeControl",
    value: function removeControl(map, control) {
      var _this7 = this;

      return new Promise(function (resolve) {
        map.controls.remove(control);
        resolve(_this7);
      });
    }
  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      geoObject.events.add(type, fn, context);
      return this;
    }
  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      geoObject.events.remove(type, fn, context);
      return this;
    }
  }]);

  return YandexMapStrategy;
}();

exports.YandexMapStrategy = YandexMapStrategy;
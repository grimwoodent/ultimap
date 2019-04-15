"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletMapStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

require("leaflet/dist/leaflet.css");

var _coords = require("../../coords");

var _bounds = require("../../bounds");

require("./style/map.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletMapStrategy =
/*#__PURE__*/
function () {
  function LeafletMapStrategy() {
    _classCallCheck(this, LeafletMapStrategy);
  }

  _createClass(LeafletMapStrategy, [{
    key: "load",

    /**
     * Произвести загрузку карты в элемент
     * @param {HTMLElement} element
     * @param {ICreateMapStrategyOptions} options
     * @return {Promise<any>}
     */
    value: function load(element, options) {
      return new Promise(function (resolve) {
        var instance = L.map(element, {
          editable: true
        }).on('load', function () {
          resolve(instance);
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright" ' + 'target="_blank">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(instance);
        var center = options.center ? options.center.toArray() : null;
        var boundsCoords = options.bounds ? new L.Bounds(options.bounds.toArray()).getCenter() : null;
        var boundsCenter = boundsCoords ? [boundsCoords.x, boundsCoords.y] : null;
        instance.setView(center || boundsCenter, options.zoom);
        instance._controlCorners['custom'] = L.DomUtil.create('div', 'leaflet-custom', instance._controlContainer);
      });
    }
    /**
     * Уничтожить карту
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
        map.remove();
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
        // @TODO Проверка на то что можно остановить анимацию (при еще не загруженной карте все ломается)
        // map.stop();
        // @TODO listen event for complete
        map.panTo(coords.toArray());
        resolve(_this2);
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
      return new _coords.Coords(center.lat, center.lng);
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
        // @TODO Проверка на то что можно остановить анимацию (при еще не загруженной карте все ломается)
        // map.stop();
        // @TODO listen event for complete change bounds
        map.fitBounds(value.toArray());
        resolve(_this4);
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
      var northEast = bounds.getNorthEast();
      var southWest = bounds.getSouthWest();
      return new _bounds.Bounds({
        lat: northEast.lat,
        lng: northEast.lng
      }, {
        lat: southWest.lat,
        lng: southWest.lng
      });
    }
  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      geoObject.on(type, fn, context);
      return this;
    }
  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      geoObject.off(type, fn, context);
      return this;
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
        map.invalidateSize(false);
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
        control.addTo(map);
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
        control.remove();
        resolve(_this7);
      });
    }
  }]);

  return LeafletMapStrategy;
}();

exports.LeafletMapStrategy = LeafletMapStrategy;
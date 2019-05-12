"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletMarkerStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

require("leaflet-editable/src/Leaflet.Editable");

var _coords = require("../../coords");

var _iconFactory = require("./utils/icon-factory");

var _markerPresetStorage = require("./utils/marker-preset-storage");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletMarkerStrategy =
/*#__PURE__*/
function () {
  function LeafletMarkerStrategy() {
    _classCallCheck(this, LeafletMarkerStrategy);
  }

  _createClass(LeafletMarkerStrategy, [{
    key: "create",
    value: function create(coords, options) {
      var preset = _markerPresetStorage.markerPresetStorage.get(options.preset);

      return L.marker(coords.toArray(), {
        icon: _iconFactory.iconFactory.createBy(options.icon || preset.icon)
      });
    }
    /**
     * Установить на карту
     *
     * @param {LMarker} geoobject
     * @param {IMap} map
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "addToMap",
    value: function addToMap(geoobject, map) {
      geoobject.addTo(map.getInstance());
      return this;
    }
    /**
     * Удалить с карты
     *
     * @param {LMarker} geoobject
     * @param {IMap} map
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "removeFromMap",
    value: function removeFromMap(geoobject, map) {
      geoobject.removeFrom(map.getInstance());
      return this;
    }
    /**
     * Установить координаты метки
     *
     * @param {LMarker} geoobject
     * @param {Coords} value
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "setCoords",
    value: function setCoords(geoobject, value) {
      geoobject.setLatLng(value.toArray());
      return this;
    }
    /**
     * Получить координаты метки
     *
     * @param {LMarker} geoobject
     *
     * @return {Coords}
     */

  }, {
    key: "getCoords",
    value: function getCoords(geoobject) {
      return new _coords.Coords(geoobject.getLatLng());
    }
    /**
     * Устновить иконку маркера
     *
     * @param {LMarker} geoobject
     * @param {Icon} icon
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "setIcon",
    value: function setIcon(geoobject, icon) {
      geoobject.setIcon(_iconFactory.iconFactory.createBy(icon));
      return this;
    }
    /**
     * Установить пресет для маркера
     *
     * @param {LMarker} geoobject
     * @param {string} preset
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "setPreset",
    value: function setPreset(geoobject, preset) {
      var presetData = _markerPresetStorage.markerPresetStorage.get(preset);

      this.setIcon(geoobject, presetData.icon);
      return this;
    }
    /**
     * Получить местоположение метки
     *
     * @param geoobject
     *
     * @return {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds(geoobject) {
      return this.getCoords(geoobject).getBounds();
    }
    /**
     * Включить редактировние
     *
     * @param {Marker} geoobject
     * @param {boolean} value
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "setEditable",
    value: function setEditable(geoobject, value) {
      if (value) {
        geoobject.enableEdit();
      } else {
        geoobject.disableEdit();
      }

      return this;
    }
  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      if (!type) {
        throw new Error('Marker event name is not defined');
      }

      geoObject.on(type, fn, context);
      return this;
    }
  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      if (!type) {
        throw new Error('Marker event name is not defined');
      }

      geoObject.off(type, fn, context);
      return this;
    }
  }]);

  return LeafletMarkerStrategy;
}();

exports.LeafletMarkerStrategy = LeafletMarkerStrategy;
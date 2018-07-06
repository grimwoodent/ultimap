"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexMarkerStrategy = void 0;

var _ymaps = require("./utils/ymaps");

var _iconFactory = require("./utils/icon-factory");

var _coords = require("../../coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexMarkerStrategy =
/*#__PURE__*/
function () {
  function YandexMarkerStrategy() {
    _classCallCheck(this, YandexMarkerStrategy);
  }

  _createClass(YandexMarkerStrategy, [{
    key: "create",

    /**
     * Create new instance of marker
     *
     * @param {Coords} coords
     * @param {ICreateMarkerOptions} props
     *
     * @returns {any}
     */
    value: function create(coords, props) {
      var icon = props.icon ? _iconFactory.IconFactory.createBy(props.icon) : {};
      var preset = props.preset ? {
        preset: props.preset
      } : {};
      var compiledProps = Object.assign({}, icon, preset);
      return new _ymaps.Api.ymaps.Placemark(coords.toArray(), {}, compiledProps);
    }
    /**
     * Add marker instance to map
     *
     * @param placemark
     * @param {IMap} map
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "addToMap",
    value: function addToMap(placemark, map) {
      map.getInstance().geoObjects.add(placemark);
      return this;
    }
    /**
     * Remove marker instance from map
     *
     * @param placemark
     * @param map
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "removeFromMap",
    value: function removeFromMap(placemark, map) {
      map.getInstance().geoObjects.remove(placemark);
      return this;
    }
    /**
     * Set marker coords
     *
     * @param {YMarker} placemark
     * @param {Coords} value
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "setCoords",
    value: function setCoords(placemark, value) {
      placemark.geometry.setCoordinates(value.toArray());
      return this;
    }
    /**
     * Get marker coords
     *
     * @param {YMarker} placemark
     *
     * @returns {Coords}
     */

  }, {
    key: "getCoords",
    value: function getCoords(placemark) {
      return new _coords.Coords(placemark.geometry.getCoordinates());
    }
    /**
     * Set marker style by icon
     *
     * @param {YMarker} geoobject
     * @param {Icon} icon
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "setIcon",
    value: function setIcon(geoobject, icon) {
      // @TODO implements method
      return this;
    }
    /**
     * Set marker style bt preset
     *
     * @param {YMarker} geoobject
     * @param {string} preset
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "setPreset",
    value: function setPreset(geoobject, preset) {
      // @TODO implements method
      return this;
    }
    /**
     * Get marker bounds
     *
     * @param {YMarker} geoobject
     *
     * @returns {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds(geoobject) {
      // maybe use Api.ymaps marker.geometry.getBounds() method?
      return this.getCoords(geoobject).getBounds();
    }
    /**
     * Edit marker
     *
     * @param {YMarker} geoobject
     * @param {boolean} value
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "setEditable",
    value: function setEditable(geoobject, value) {
      geoobject.options.set('draggable', value);
      return this;
    }
    /**
     * Add event listener for marker
     *
     * @param {YMarker} geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      if (!type) {
        throw new Error('Marker event name is not defined');
      }

      geoObject.events.add(type, fn, context);
      return this;
    }
    /**
     * Remove event listener for marker
     *
     * @param {YMarker} geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @returns {IMarkerStrategy}
     */

  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      if (!type) {
        throw new Error('Marker event name is not defined');
      }

      geoObject.events.remove(type, fn, context);
      return this;
    }
  }]);

  return YandexMarkerStrategy;
}();

exports.YandexMarkerStrategy = YandexMarkerStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexPolygonStrategy = void 0;

var _ymaps = require("./utils/ymaps");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @TODO move to style factory
var POLYGON_STYLE = {
  strokeColor: 'strokeColor',
  strokeOpacity: 'strokeOpacity',
  strokeWidth: 'strokeWidth',
  fillColor: 'fillColor',
  fillOpacity: 'fillOpacity'
};
var POLYGON_PROPS = Object.assign({}, POLYGON_STYLE);

var YandexPolygonStrategy =
/*#__PURE__*/
function () {
  function YandexPolygonStrategy() {
    _classCallCheck(this, YandexPolygonStrategy);
  }

  _createClass(YandexPolygonStrategy, [{
    key: "create",

    /**
     * Create new polygon instance
     * @param {PolygonCoords} coords
     * @param {ICreatePolygonOptions} props
     * @return {any}
     */
    value: function create(coords, props) {
      var preset = props.preset ? {
        preset: props.preset
      } : {};
      var compiledProps = Object.assign({}, preset); // @TODO move to style factory

      Object.keys(POLYGON_PROPS).forEach(function (key) {
        var propKey = POLYGON_PROPS[key];
        var prop = props[propKey];

        if (prop === undefined) {
          return;
        }

        compiledProps[key] = prop;
      });
      return new _ymaps.Api.ymaps.Polygon(coords.toArray(), {}, compiledProps);
    }
    /**
     * Add polygon to map
     *
     * @param {YPolygon} polygon
     * @param {IMap} map
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "addToMap",
    value: function addToMap(polygon, map) {
      map.getInstance().geoObjects.add(polygon);
      return this;
    }
    /**
     * Remove polygon from map
     *
     * @param {YPolygon} polygon
     * @param {IMap} map
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "removeFromMap",
    value: function removeFromMap(polygon, map) {
      map.getInstance().geoObjects.remove(polygon);
      return this;
    }
    /**
     * @set polygon coords
     *
     * @param {YPolygon} geoObject
     * @param {PolygonCoords} value
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setCoords",
    value: function setCoords(geoObject, value) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Get polygon goords
     *
     * @param {YPolygon} geoObject
     *
     * @return {PolygonCoords}
     */

  }, {
    key: "getCoords",
    value: function getCoords(geoObject) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return null;
    }
    /**
     * Get polygon bounds
     *
     * @param {YPolygon} geoobject
     *
     * @return {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds(geoobject) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return null;
    }
    /**
     * Set polygon styles
     *
     * @param {YPolygon} geoobject
     * @param {ICreatePolygonStyle} style
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setStyle",
    value: function setStyle(geoobject, style) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Set polygon style by preset
     *
     * @param {YPolygon} geoobject
     * @param {string} preset
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setPreset",
    value: function setPreset(geoobject, preset) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Set polygon editing state
     *
     * @param {YPolygon} geoobject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setEditable",
    value: function setEditable(geoobject, value) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Set polygon drawing state
     *
     * @param {YPolygon} geoobject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setDrawing",
    value: function setDrawing(geoobject, value) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Add event to polygon
     *
     * @param {YPolygon} geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return this;
    }
    /**
     * Remove event from polygon
     *
     * @param {YPolygon} geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      // @TODO implements method
      throw new Error('Method not implemented');
      return null;
    }
  }]);

  return YandexPolygonStrategy;
}();

exports.YandexPolygonStrategy = YandexPolygonStrategy;
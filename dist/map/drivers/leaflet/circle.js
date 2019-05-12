"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletCircleStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

require("leaflet-editable/src/Leaflet.Editable");

var _coords = require("../../coords");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @TODO move to style factory
var CIRCLE_STYLE = {
  color: 'strokeColor',
  opacity: 'strokeOpacity',
  weight: 'strokeWidth',
  fillColor: 'fillColor',
  fillOpacity: 'fillOpacity'
};
var CIRCLE_PROPS = Object.assign({}, CIRCLE_STYLE);

var LeafletCircleStrategy =
/*#__PURE__*/
function () {
  function LeafletCircleStrategy() {
    _classCallCheck(this, LeafletCircleStrategy);
  }

  _createClass(LeafletCircleStrategy, [{
    key: "create",

    /**
     * Create new circle
     * @param {Coords} coords
     * @param {ICreateCircleOptions} options
     * @returns {any}
     */
    value: function create(coords, options) {
      var props = {}; // @TODO move to style factory

      Object.keys(CIRCLE_PROPS).forEach(function (key) {
        var propKey = CIRCLE_PROPS[key];
        var option = options[propKey];

        if (option === undefined) {
          return;
        }

        props[key] = option;
      });
      return L.circle(coords.toArray(), options.radius, props);
    }
  }, {
    key: "setRadius",
    value: function setRadius(geoObject, radius) {
      geoObject.setRadius(radius);
      return this;
    }
  }, {
    key: "getRadius",
    value: function getRadius(geoObject) {
      return geoObject.getRadius();
    }
    /**
     * Add to map
     * @param {Circle} geoObject
     * @param {IMap} map
     * @returns {ICircleStrategy}
     */

  }, {
    key: "addToMap",
    value: function addToMap(geoObject, map) {
      geoObject.addTo(map.getInstance());
      return this;
    }
    /**
     * Remove circle from map
     * @param {Circle} geoObject
     * @param {IMap} map
     * @returns {ICircleStrategy}
     */

  }, {
    key: "removeFromMap",
    value: function removeFromMap(geoObject, map) {
      geoObject.removeFrom(map.getInstance());
      return this;
    }
    /**
     * Set circle center
     * @param {Circle} geoObject
     * @param {Coords} value
     * @returns {ICircleStrategy}
     */

  }, {
    key: "setCoords",
    value: function setCoords(geoObject, value) {
      geoObject.setLatLng(value.toArray());
      return this;
    }
    /**
     * Get circle coords
     * @param {Circle} geoObject
     * @returns {Coords}
     */

  }, {
    key: "getCoords",
    value: function getCoords(geoObject) {
      return new _coords.Coords(geoObject.getLatLng());
    }
    /**
     * Get circle bounds
     * @param {Circle} geoObject
     * @returns {Bounds}
     */

  }, {
    key: "getBounds",
    value: function getBounds(geoObject) {
      return this.getCoords(geoObject).getBounds();
    }
  }, {
    key: "setStyle",
    value: function setStyle(geoobject, style) {
      var props = {}; // @TODO move to style factory

      Object.keys(CIRCLE_STYLE).forEach(function (key) {
        var option = style[CIRCLE_STYLE[key]];

        if (option !== undefined) {
          props[key] = option;
        }
      });
      geoobject.setStyle(props);
      return this;
    }
    /**
     * Включить редактировние
     *
     * @param {Marker} geoObject
     * @param {boolean} value
     *
     * @return {IMarkerStrategy}
     */

  }, {
    key: "setEditable",
    value: function setEditable(geoObject, value) {
      if (value) {
        geoObject.enableEdit();
      } else {
        geoObject.disableEdit();
      }

      return this;
    }
    /**
     * Add event handler
     * @param geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     * @returns {ICircleStrategy}
     */

  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      if (!type) {
        throw new Error('Marker event name is not defined');
      }

      geoObject.on(type, fn, context);
      return this;
    }
    /**
     * Remove event handler
     * @param geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     * @returns {ICircleStrategy}
     */

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

  return LeafletCircleStrategy;
}();

exports.LeafletCircleStrategy = LeafletCircleStrategy;
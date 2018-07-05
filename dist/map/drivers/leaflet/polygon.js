"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletPolygonStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

var _polygonCoords = require("../../polygon-coords");

var _bounds = require("../../bounds");

var _polygonPresetStorge = require("./utils/polygon-preset-storge");

var _polygonCoords2 = require("../../utils/polygon-coords");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @TODO move to style factory
var POLYGON_STYLE = {
  color: 'strokeColor',
  opacity: 'strokeOpacity',
  weight: 'strokeWidth',
  fillColor: 'fillColor',
  fillOpacity: 'fillOpacity'
};
var POLYGON_PROPS = Object.assign({}, POLYGON_STYLE);

var LeafletPolygonStrategy =
/*#__PURE__*/
function () {
  function LeafletPolygonStrategy() {
    _classCallCheck(this, LeafletPolygonStrategy);
  }

  _createClass(LeafletPolygonStrategy, [{
    key: "create",
    value: function create(coords, options) {
      var preset = _polygonPresetStorge.polygonPresetStorge.get(options.preset);

      var props = {}; // @TODO move to style factory

      Object.keys(POLYGON_PROPS).forEach(function (key) {
        var propKey = POLYGON_PROPS[key];
        var option = options[propKey];

        if (option === undefined) {
          if (!preset || !preset.style) {
            return;
          }

          option = preset.style[propKey];

          if (option === undefined) {
            return;
          }
        }

        props[key] = option;
      });
      return L.polygon(coords.toArray(), props);
    }
  }, {
    key: "addToMap",
    value: function addToMap(geoobject, map) {
      geoobject.addTo(map.getInstance());
      return this;
    }
  }, {
    key: "removeFromMap",
    value: function removeFromMap(geoobject, map) {
      geoobject.removeFrom(map.getInstance());
      return this;
    }
  }, {
    key: "setCoords",
    value: function setCoords(geoobject, value) {
      geoobject.setLatLngs(value.toArray());
      return this;
    }
  }, {
    key: "getCoords",
    value: function getCoords(geoobject) {
      return new _polygonCoords.PolygonCoords(_polygonCoords2.UtilsPolygonCoords.toNumbers(geoobject.getLatLngs()));
    }
  }, {
    key: "getBounds",
    value: function getBounds(geoobject) {
      var bounds = geoobject.getBounds();
      return new _bounds.Bounds(bounds.getNorthWest(), bounds.getSouthWest());
    }
    /**
     * Установить стили для полигона
     *
     * @param geoobject
     * @param {ICreatePolygonStyle} style
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setStyle",
    value: function setStyle(geoobject, style) {
      var props = {}; // @TODO move to style factory

      Object.keys(POLYGON_STYLE).forEach(function (key) {
        var option = style[POLYGON_STYLE[key]];

        if (option !== undefined) {
          props[key] = option;
        }
      });
      geoobject.setStyle(props);
      return this;
    }
    /**
     * Установить пресет
     *
     * @param geoobject
     * @param {string} preset
     *
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setPreset",
    value: function setPreset(geoobject, preset) {
      var presetData = _polygonPresetStorge.polygonPresetStorge.get(preset);

      this.setStyle(geoobject, presetData.style);
      return this;
    }
    /**
     * Установить состояние редактирования
     *
     * @param geoobject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
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
    /**
     * Установить состояние рисования
     * @param {Polygon} geoobject
     * @param {boolean} value
     * @return {IPolygonStrategy}
     */

  }, {
    key: "setDrawing",
    value: function setDrawing(geoobject, value) {
      if (!value) {
        geoobject.stopDrawing();
        return this;
      }

      if (!geoobject.editEnabled()) {
        this.setEditable(geoobject, true);
      }

      geoobject.editor.startDrawingForward();
      return this;
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
  }]);

  return LeafletPolygonStrategy;
}();

exports.LeafletPolygonStrategy = LeafletPolygonStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markerPresetStorage = void 0;

var _icon = require("../../../icon");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MarkerPresetStorage =
/*#__PURE__*/
function () {
  function MarkerPresetStorage() {
    _classCallCheck(this, MarkerPresetStorage);

    _defineProperty(this, "presets", {});
  }

  _createClass(MarkerPresetStorage, [{
    key: "add",

    /**
     * Добавить новый пресет
     *
     * @param {string} preset
     * @param {{icon: IIcon}} props
     *
     * @return {MarkerPresetStorage}
     */
    value: function add(preset, props) {
      this.presets[preset] = {
        icon: props.icon ? new _icon.Icon(props.icon) : null
      };
      return this;
    }
    /**
     * Получить пресет по названию
     *
     * @param {string} preset
     *
     * @return {IMarkerPreset}
     */

  }, {
    key: "get",
    value: function get(preset) {
      if (!preset) {
        return null;
      }

      if (!this.presets[preset]) {
        throw new Error('Preset not found');
      }

      return this.presets[preset];
    }
  }]);

  return MarkerPresetStorage;
}();

var markerPresetStorage = new MarkerPresetStorage();
exports.markerPresetStorage = markerPresetStorage;
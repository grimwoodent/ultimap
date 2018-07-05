"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polygonPresetStorge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PolygonPresetStorge =
/*#__PURE__*/
function () {
  function PolygonPresetStorge() {
    _classCallCheck(this, PolygonPresetStorge);

    _defineProperty(this, "presets", {});
  }

  _createClass(PolygonPresetStorge, [{
    key: "add",

    /**
     * Добавить новый пресет
     *
     * @param {string} preset
     * @param {{style: ICreatePolygonStyle}} props
     *
     * @return {PolygonPresetStorge}
     */
    value: function add(preset, props) {
      this.presets[preset] = {
        // @TODO Потенциальная ошибка, в случае не соответствия полей при обновлении и создании
        style: props.style || null
      };
      return this;
    }
    /**
     * Получить пресет по названию
     *
     * @param {string} preset
     *
     * @return {IPolygonPresetProperties}
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

  return PolygonPresetStorge;
}();

var polygonPresetStorge = new PolygonPresetStorge();
exports.polygonPresetStorge = polygonPresetStorge;
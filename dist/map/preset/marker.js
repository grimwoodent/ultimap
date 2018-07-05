"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkerPreset = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MarkerPreset =
/*#__PURE__*/
function () {
  function MarkerPreset(strategy) {
    _classCallCheck(this, MarkerPreset);

    _defineProperty(this, "strategy", void 0);

    if (!strategy) {
      throw new Error('Geo strategy not found');
    }

    this.strategy = strategy;
  }
  /**
   * Добавить новый пресет
   *
   * @param {string} preset
   * @param {ICreateMarkerPresetProperties} props
   *
   * @return {IMarkerPreset}
   */


  _createClass(MarkerPreset, [{
    key: "add",
    value: function add(preset, props) {
      this.getStratgy().create(preset, props);
      return this;
    }
    /**
     * Стратегия работы с объектом
     * @return {IMapStrategy}
     */

  }, {
    key: "getStratgy",
    value: function getStratgy() {
      return this.strategy.preset.marker;
    }
  }]);

  return MarkerPreset;
}();

exports.MarkerPreset = MarkerPreset;
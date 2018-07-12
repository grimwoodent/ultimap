"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapControlController = void 0;

var _controlConstructor = require("./control-constructor");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapControlController =
/*#__PURE__*/
function () {
  function MapControlController(strategy) {
    _classCallCheck(this, MapControlController);

    _defineProperty(this, "strategy", void 0);

    this.strategy = strategy || null;
  }

  _createClass(MapControlController, [{
    key: "getStrategy",

    /**
     * Get the current work strategy.
     *
     * @return {IGeoStrategy}
     */
    value: function getStrategy() {
      return this.strategy;
    }
  }, {
    key: "element",
    get: function get() {
      return new _controlConstructor.MapControlConstructor(this.getStrategy());
    }
  }]);

  return MapControlController;
}();

exports.MapControlController = MapControlController;
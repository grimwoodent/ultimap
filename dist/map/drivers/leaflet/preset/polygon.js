"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletPolygonPresetStrategy = void 0;

var _polygonPresetStorge = require("../utils/polygon-preset-storge");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletPolygonPresetStrategy =
/*#__PURE__*/
function () {
  function LeafletPolygonPresetStrategy() {
    _classCallCheck(this, LeafletPolygonPresetStrategy);
  }

  _createClass(LeafletPolygonPresetStrategy, [{
    key: "create",
    value: function create(preset, props) {
      _polygonPresetStorge.polygonPresetStorge.add(preset, {
        style: props.style
      });

      return this;
    }
  }, {
    key: "get",
    value: function get(preset) {
      return _polygonPresetStorge.polygonPresetStorge.get(preset);
    }
  }]);

  return LeafletPolygonPresetStrategy;
}();

exports.LeafletPolygonPresetStrategy = LeafletPolygonPresetStrategy;
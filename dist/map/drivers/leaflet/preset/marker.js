"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletMarkerPresetStrategy = void 0;

var _markerPresetStorage = require("../utils/marker-preset-storage");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletMarkerPresetStrategy =
/*#__PURE__*/
function () {
  function LeafletMarkerPresetStrategy() {
    _classCallCheck(this, LeafletMarkerPresetStrategy);
  }

  _createClass(LeafletMarkerPresetStrategy, [{
    key: "create",
    value: function create(preset, props) {
      _markerPresetStorage.markerPresetStorage.add(preset, {
        icon: props.icon
      });

      return this;
    }
  }]);

  return LeafletMarkerPresetStrategy;
}();

exports.LeafletMarkerPresetStrategy = LeafletMarkerPresetStrategy;
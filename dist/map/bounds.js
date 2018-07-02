"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bounds = void 0;

var _coords = require("./coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bounds =
/*#__PURE__*/
function () {
  function Bounds(corner1, corner2) {
    _classCallCheck(this, Bounds);

    _defineProperty(this, "corner1", void 0);

    _defineProperty(this, "corner2", void 0);

    if (!corner2 && Array.isArray(corner1)) {
      this.corner1 = new _coords.Coords(corner1[0]);
      this.corner2 = new _coords.Coords(corner1[1]);
    } else if (!corner1 || !corner2) {
      throw new Error('Bounds parse corners coords error');
    } else {
      this.corner1 = corner1 instanceof _coords.Coords ? corner1 : new _coords.Coords(corner1);
      this.corner2 = corner2 instanceof _coords.Coords ? corner2 : new _coords.Coords(corner2);
    }
  }

  _createClass(Bounds, [{
    key: "toArray",
    value: function toArray() {
      return [this.corner1.toArray(), this.corner2.toArray()];
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return [this.corner1.toPoint(), this.corner2.toPoint()];
    }
  }]);

  return Bounds;
}();

exports.Bounds = Bounds;
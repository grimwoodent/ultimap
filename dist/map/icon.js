"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Icon =
/*#__PURE__*/
function () {
  function Icon(src, size, offset) {
    _classCallCheck(this, Icon);

    _defineProperty(this, "src", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "offset", void 0);

    if (_typeof(src) === 'object') {
      this.src = src.src;
      this.size = src.size;
      this.offset = src.offset;
    } else {
      this.src = src;
      this.size = size;
      this.offset = offset;
    }

    if (!this.src || !this.size) {
      throw new Error('Empty icon');
    }
  }

  _createClass(Icon, [{
    key: "toObject",
    value: function toObject() {
      return {
        src: this.src,
        size: this.size,
        offset: this.offset
      };
    }
  }]);

  return Icon;
}();

exports.Icon = Icon;
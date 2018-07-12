"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapControl = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapControl =
/*#__PURE__*/
function () {
  function MapControl(instance, baseConstructor) {
    _classCallCheck(this, MapControl);

    _defineProperty(this, "instance", void 0);

    if (baseConstructor) {
      var _ref;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      (_ref = baseConstructor).call.apply(_ref, [this, this].concat(args));
    }

    this.instance = instance;
  }

  _createClass(MapControl, [{
    key: "getInstance",
    value: function getInstance() {
      return this.instance;
    }
  }]);

  return MapControl;
}();

exports.MapControl = MapControl;
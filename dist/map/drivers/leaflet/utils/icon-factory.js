"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconFactory = void 0;

var L = _interopRequireWildcard(require("leaflet"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IconFactory =
/*#__PURE__*/
function () {
  function IconFactory() {
    _classCallCheck(this, IconFactory);
  }

  _createClass(IconFactory, [{
    key: "createBy",
    value: function createBy(icon) {
      if (!icon) {
        throw new Error('Empty icon for create marker');
      }

      return L.icon({
        iconUrl: icon.src || null,
        iconSize: icon.size || null,
        iconAnchor: icon.offset || null
      });
    }
  }]);

  return IconFactory;
}();

var iconFactory = new IconFactory();
exports.iconFactory = iconFactory;
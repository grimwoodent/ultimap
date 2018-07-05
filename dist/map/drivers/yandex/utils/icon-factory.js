"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconFactory = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IconFactory =
/*#__PURE__*/
function () {
  function IconFactory() {
    _classCallCheck(this, IconFactory);
  }

  _createClass(IconFactory, null, [{
    key: "createBy",
    value: function createBy(icon) {
      if (!icon) {
        throw new Error('Empty icon for create marker');
      }

      var offset = icon.offset && Array.isArray(icon.offset) ? icon.offset : [];
      return {
        iconLayout: 'default#image',
        // @TODO maybe other layouts
        iconImageHref: icon.src,
        iconImageSize: icon.size,
        // reverse offset values
        iconImageOffset: [offset[0] ? -offset[0] : 0, offset[1] ? -offset[1] : 0]
      };
    }
  }]);

  return IconFactory;
}();

exports.IconFactory = IconFactory;
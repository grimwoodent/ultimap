"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexGeoEventStrategy = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexGeoEventStrategy =
/*#__PURE__*/
function () {
  function YandexGeoEventStrategy() {
    _classCallCheck(this, YandexGeoEventStrategy);
  }

  _createClass(YandexGeoEventStrategy, [{
    key: "getNames",
    value: function getNames() {
      return {
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseenter',
        mouseleave: 'mouseleave',
        drag: 'boundschange',
        // other action?
        dragstart: 'actionbegin',
        // other action?
        dragend: 'actionend',
        // other action?
        contextmenu: 'contextmenu',
        move: 'boundschange'
      };
    }
  }]);

  return YandexGeoEventStrategy;
}();

exports.YandexGeoEventStrategy = YandexGeoEventStrategy;
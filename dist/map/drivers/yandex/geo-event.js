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
    key: "getMapEventName",
    value: function getMapEventName() {
      return {
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseenter',
        mouseleave: 'mouseleave',
        drag: 'boundschange',
        // ?
        dragstart: 'actionbegin',
        // ?
        dragend: 'actionend',
        // ?
        contextmenu: 'contextmenu',
        move: 'boundschange'
      };
    }
  }, {
    key: "getMarkerEventName",
    value: function getMarkerEventName() {
      return {
        // add: 'add', // ?
        // remove: 'remove', // ?
        drag: 'drag',
        dragstart: 'dragstart',
        dragend: 'dragend',
        move: 'geometrychange',
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseenter',
        mouseleave: 'mouseleave'
      };
    }
  }, {
    key: "getPolygonEventName",
    value: function getPolygonEventName() {
      return {
        // add: 'add', // ?
        // remove: 'remove', // ?
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseenter',
        mouseleave: 'mouseleave'
      };
    }
  }]);

  return YandexGeoEventStrategy;
}();

exports.YandexGeoEventStrategy = YandexGeoEventStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletGeoEventStrategy = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletGeoEventStrategy =
/*#__PURE__*/
function () {
  function LeafletGeoEventStrategy() {
    _classCallCheck(this, LeafletGeoEventStrategy);
  }

  _createClass(LeafletGeoEventStrategy, [{
    key: "getMapEventName",
    value: function getMapEventName() {
      return {
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        drag: 'drag',
        dragstart: 'dragstart',
        dragend: 'dragend',
        contextmenu: 'contextmenu',
        move: 'move'
      };
    }
  }, {
    key: "getMarkerEventName",
    value: function getMarkerEventName() {
      return {
        add: 'add',
        remove: 'remove',
        drag: 'drag',
        dragstart: 'dragstart',
        dragend: 'dragend',
        move: 'move',
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
      };
    }
  }, {
    key: "getPolygonEventName",
    value: function getPolygonEventName() {
      return {
        add: 'add',
        remove: 'remove',
        click: 'click',
        mousedown: 'mousedown',
        mouseup: 'mouseup',
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
      };
    }
  }]);

  return LeafletGeoEventStrategy;
}();

exports.LeafletGeoEventStrategy = LeafletGeoEventStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletDOMEventStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

var _coords = require("../../coords");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletDOMEventStrategy =
/*#__PURE__*/
function () {
  function LeafletDOMEventStrategy() {
    _classCallCheck(this, LeafletDOMEventStrategy);
  }

  _createClass(LeafletDOMEventStrategy, [{
    key: "getCoords",

    /**
     * Получить координаты от события
     *
     * @param domEvent
     *
     * @return {Coords}
     */
    value: function getCoords(domEvent) {
      return new _coords.Coords(domEvent.latlng);
    }
    /**
     * Остановить распространение события
     *
     * @param domEvent
     *
     * @return {IDOMEventStrategy}
     */

  }, {
    key: "stop",
    value: function stop(domEvent) {
      L.DomEvent.stopPropagation(domEvent);
      return this;
    }
  }]);

  return LeafletDOMEventStrategy;
}();

exports.LeafletDOMEventStrategy = LeafletDOMEventStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoEvent = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GeoEvent =
/*#__PURE__*/
function () {
  function GeoEvent(strategy) {
    _classCallCheck(this, GeoEvent);

    _defineProperty(this, "strategy", void 0);

    this.strategy = strategy;
  }

  _createClass(GeoEvent, [{
    key: "getStrategy",

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    value: function getStrategy() {
      return this.strategy.geoEvent;
    }
  }, {
    key: "map",
    get: function get() {
      return this.getStrategy().getMapEventName();
    }
  }, {
    key: "marker",
    get: function get() {
      return this.getStrategy().getMarkerEventName();
    }
  }, {
    key: "polygon",
    get: function get() {
      return this.getStrategy().getPolygonEventName();
    }
  }]);

  return GeoEvent;
}();

exports.GeoEvent = GeoEvent;
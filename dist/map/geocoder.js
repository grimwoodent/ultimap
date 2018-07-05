"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geocoder = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Geocoder =
/*#__PURE__*/
function () {
  function Geocoder(strategy) {
    _classCallCheck(this, Geocoder);

    _defineProperty(this, "strategy", void 0);

    this.strategy = strategy;
  }
  /**
   * Какие объекты находятся рядом с точкой
   * @param {tCoords} coords
   * @return {Promise<IGeocodeResult>}
   */


  _createClass(Geocoder, [{
    key: "whatAt",
    value: function whatAt(coords) {
      return this.getStrategy().whatAt(coords);
    }
    /**
     * Где находится этот адресс
     * @param {string} address
     * @param {tCoords} coords
     * @return {Promise<IGeocodeResult>}
     */

  }, {
    key: "whereIs",
    value: function whereIs(address, coords) {
      return this.getStrategy().whereIs(address, coords);
    }
    /**
     * Стратегия работы с геообъектом
     * @return {IGeocoderStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      return this.strategy.geocoder;
    }
  }]);

  return Geocoder;
}();

exports.Geocoder = Geocoder;
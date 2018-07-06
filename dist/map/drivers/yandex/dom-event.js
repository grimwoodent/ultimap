"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexDOMEventStrategy = void 0;

var _coords = require("../../coords");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexDOMEventStrategy =
/*#__PURE__*/
function () {
  function YandexDOMEventStrategy() {
    _classCallCheck(this, YandexDOMEventStrategy);
  }

  _createClass(YandexDOMEventStrategy, [{
    key: "getCoords",

    /**
     * Получить координаты от события
     *
     * @param domEvent
     *
     * @return {Coords}
     */
    value: function getCoords(domEvent) {
      return new _coords.Coords(domEvent.get('coords'));
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
      domEvent.stopPropagation();
      return this;
    }
  }]);

  return YandexDOMEventStrategy;
}();

exports.YandexDOMEventStrategy = YandexDOMEventStrategy;
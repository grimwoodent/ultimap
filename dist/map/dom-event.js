"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMEvent = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOMEvent =
/*#__PURE__*/
function () {
  function DOMEvent(strategy) {
    _classCallCheck(this, DOMEvent);

    _defineProperty(this, "instance", void 0);

    _defineProperty(this, "strategy", void 0);

    this.strategy = strategy;
  }
  /**
   * Создать экземпляр объекта события
   *
   * @param instance
   *
   * @return {IDOMEvent}
   */


  _createClass(DOMEvent, [{
    key: "create",
    value: function create(instance) {
      this.instance = instance;
      return this;
    }
    /**
     * Получить координаты объекта
     *
     * @param domEvent
     *
     * @return {Coords}
     */

  }, {
    key: "getCoords",
    value: function getCoords() {
      return this.getStrategy().getCoords(this.getInstance());
    }
    /**
     * Остановить распространение события
     *
     * @return {IDOMEvent}
     */

  }, {
    key: "stop",
    value: function stop() {
      this.getStrategy().stop(this.getInstance());
      return this;
    }
    /**
     * Получить элемент события
     *
     * @return {any}
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.instance;
    }
    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      return this.strategy.domEvent;
    }
  }]);

  return DOMEvent;
}();

exports.DOMEvent = DOMEvent;
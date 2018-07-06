"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Evented = void 0;

var _events = require("./events");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Evented =
/*#__PURE__*/
function () {
  function Evented(strategy) {
    var _this = this;

    _classCallCheck(this, Evented);

    _defineProperty(this, "instance", void 0);

    _defineProperty(this, "strategy", void 0);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "events", void 0);

    if (!strategy) {
      throw new Error('Geo strategy not found');
    }

    this.props = {}; // Передаем провайдер событий в стратегию

    this.events = new _events.Events({
      on: function on(type, fn) {
        if (_this.hasInstance()) {
          _this.getStrategy().on(_this.getInstance(), type, fn);
        }
      },
      off: function off(type, fn) {
        if (_this.hasInstance()) {
          _this.getStrategy().off(_this.getInstance(), type, fn);
        }
      }
    });
    this.strategy = strategy;
  }
  /**
   * Обновить параметры объекта
   *
   * @param {TPropertiesForUpdate} options
   *
   * @return {Promise<IGeoObject>}
   */


  _createClass(Evented, [{
    key: "hasInstance",

    /**
     * Есть ли созданный экземпляр объекта для стратегии
     *
     * @return {boolean}
     */
    value: function hasInstance() {
      return !!this.instance;
    }
    /**
     * Получить элемент для работы со стратегиями
     *
     * @return {any}
     */

  }, {
    key: "on",

    /**
     * Включить событие
     *
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     *
     * @return {IEvented<TPropertiesForUpdate>}
     */
    value: function on(type, fn) {
      var _this2 = this;

      if (!type) {
        // throw new Error(`Geo event name is not defined`);
        console.error('Geo event name is not defined');
        return this;
      }

      var events = _typeof(type) === 'object' ? type : _defineProperty({}, type, fn); // Работа со стратегией перенесена в группы через strategyProvider

      Object.keys(events).forEach(function (key) {
        if (!events[key]) {
          throw new Error("Geo event \"".concat(key, "\" is not defined"));
        }

        _this2.events.add(key, events[key]);
      });
      return this;
    }
    /**
     * Отключить событие
     *
     * @param {string} type
     * @param {EventHandlerFn} fn
     *
     * @return {IEvented<TPropertiesForUpdate>}
     */

  }, {
    key: "off",
    value: function off(type, fn) {
      if (this.events.isEmpty(type)) {
        return this;
      } // Работа со стратегией перенесена в группы через strategyProvider


      this.events.remove(type, fn);
      return this;
    }
    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */

  }]);

  return Evented;
}();

exports.Evented = Evented;
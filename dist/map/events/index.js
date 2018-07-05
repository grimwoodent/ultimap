"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;

var _group = require("./group");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Events =
/*#__PURE__*/
function () {
  /** @var {IEventsGroup} general Основная группа событий для объекта */

  /** @var {IEventsStrategyProvider} strategyProvider Провайдер методов для работы со стратегией объекта */
  function Events(strategyProvider) {
    _classCallCheck(this, Events);

    _defineProperty(this, "general", void 0);

    _defineProperty(this, "strategyProvider", void 0);

    this.strategyProvider = strategyProvider;
    this.general = new _group.EventsGroup(this.strategyProvider);
  }

  _createClass(Events, [{
    key: "resetAll",
    value: function resetAll() {
      this.general.resetAll();
      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.general.removeAll();
      return this;
    }
  }, {
    key: "group",
    value: function group() {
      return new _group.EventsGroup(this.strategyProvider);
    }
    /**
     * Добавить событие
     *
     * @param {string} key
     * @param {IEventInList | EventHandlerFn} event
     *
     * @return {IEvents}
     */

  }, {
    key: "add",
    value: function add(key, event) {
      this.general.add(key, event);
      return this;
    }
    /**
     * Удалить события/событие по ключу
     *
     * @param {string} key
     * @param {EventHandlerFn} fn
     *
     * @return {IEvents}
     */

  }, {
    key: "remove",
    value: function remove(key, fn) {
      this.general.remove(key, fn);
      return this;
    }
    /**
     * Получить все соыбтия по этому ключу
     *
     * @param {string} key
     *
     * @return {Array<IEventInList>}
     */

  }, {
    key: "get",
    value: function get(key) {
      return this.general.get(key);
    }
    /**
     * Есть ли события по этому ключу
     *
     * @param {string} key
     *
     * @return {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(key) {
      return this.general.isEmpty(key);
    }
  }]);

  return Events;
}();

exports.Events = Events;
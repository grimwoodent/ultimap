"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsGroup = void 0;

var Utils = _interopRequireWildcard(require("./../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EventsGroup =
/*#__PURE__*/
function () {
  function EventsGroup(strategyProvider) {
    _classCallCheck(this, EventsGroup);

    _defineProperty(this, "strategyProvider", void 0);

    _defineProperty(this, "list", void 0);

    this.strategyProvider = strategyProvider;
    this.list = {};
  }
  /**
   * Обновить все события на элементе
   *
   * @return {IEventsGroup}
   */


  _createClass(EventsGroup, [{
    key: "resetAll",
    value: function resetAll() {
      var _this = this;

      Object.keys(this.list).forEach(function (key) {
        var events = _this.list[key];
        events.forEach(function (event) {
          _this.strategyProvider.off(key, event.fn);

          _this.strategyProvider.on(key, event.fn);
        });
      });
      return this;
    }
    /**
     * Добавить событие
     *
     * @param {string} key
     * @param {IEventInList|EventHandlerFn} fn
     *
     * @return {IEvents}
     */

  }, {
    key: "add",
    value: function add(key, fn) {
      if (!key) {
        throw new Error('Key not found');
      }

      var event = _typeof(fn) === 'object' ? fn : {
        fn: fn
      };

      if (typeof event.fn !== 'function') {
        throw new Error('Event type is`not function');
      }

      this.list[key] = this.get(key).concat([event]);
      this.strategyProvider.on(key, event.fn);
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
      if (!fn) {
        this.get(key).forEach(function (event) {
          event.fn = Utils.falseFn;
        });
        delete this.list[key];
      } else {
        var events = this.get(key);
        var idx = events.findIndex(function (event) {
          return event.fn === fn;
        });

        if (~idx) {
          var _event = events[idx];
          _event.fn = Utils.falseFn;
          this.list[key].splice(idx, 1);
        }
      }

      this.strategyProvider.off(key, fn);
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
      if (!key) {
        throw new Error('Key not found');
      }

      return this.list[key] || [];
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
      if (!key) {
        throw new Error('Key not found');
      }

      return !this.get(key).length;
    }
    /**
     * Удалить все события
     * @return {IEventsGroup}
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      var _this2 = this;

      Object.keys(this.list).forEach(function (key) {
        _this2.remove(key);
      });
      return this;
    }
  }]);

  return EventsGroup;
}();

exports.EventsGroup = EventsGroup;
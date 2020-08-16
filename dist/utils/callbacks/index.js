"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Callbacks = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Callbacks =
/*#__PURE__*/
function () {
  /**
   * @param {Object} events
   */
  function Callbacks(events) {
    _classCallCheck(this, Callbacks);

    _defineProperty(this, "events", {});

    this.set(events);
  }
  /**
   * Установить события
   *
   * @param {Object} events
   *
   * @return {Callbacks} self
   */


  _createClass(Callbacks, [{
    key: "set",
    value: function set(events) {
      var _this = this;

      Object.keys(events || {}).forEach(function (key) {
        if (!_this.events[key]) {
          _this.events[key] = [];
        }

        var newEvents = Array.isArray(events[key]) ? events[key] : [events[key]];
        newEvents.forEach(function (event) {
          if (typeof event === 'function') {
            _this.events[key].push(event);
          }
        });
      });
      return this;
    }
    /**
     * Получить функцию по ключу
     *
     * @param {String} key
     *
     * @return {EventHandlerFn} callback
     */

  }, {
    key: "get",
    value: function get(key) {
      if (!this.has(key)) {
        return null;
      }

      var result = [].concat(this.events[key]);
      return result.length > 1 ? result : result[0];
    }
    /**
     * удалить событие
     * @param {IEventHandlerSetProps} events
     * @return {Callbacks}
     */

  }, {
    key: "remove",
    value: function remove(events) {
      var _this2 = this;

      Object.keys(events || {}).forEach(function (key) {
        if (!_this2.has(key)) {
          return;
        }

        var remoedEvents = Array.isArray(events[key]) ? events[key] : [events[key]];

        var _loop = function _loop() {
          var event = remoedEvents.pop();

          var idx = _this2.events[key].findIndex(function (fn) {
            return event === fn;
          });

          if (!!~idx) {
            _this2.events[key].splice(idx, 1);
          }
        };

        while (remoedEvents.length) {
          _loop();
        }
      });
      return this;
    }
    /**
     * Возвращает установлена ли функция с таким ключом
     *
     * @param {String} key
     *
     * @return {Boolean}
     */

  }, {
    key: "has",
    value: function has(key) {
      if (typeof key !== 'string') {
        return false;
      }

      return key && this.events[key] && !!this.events[key].length;
    }
    /**
     * Вызвать функцию по ключу с аргументами
     *
     * @param {String} key
     *
     * @return {any} result
     */

  }, {
    key: "trigger",
    value: function trigger(key) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.has(key)) {
        return undefined;
      }

      var result = this.events[key].map(function (event) {
        return event.apply(undefined, args);
      });
      return result.length > 1 ? result : result.pop();
    }
    /**
     * Возвращает установлена ли функция с таким ключом
     *
     * @deprecated
     *
     * @param {String} key
     *
     * @return {Boolean}
     */

  }, {
    key: "isSet",
    value: function isSet(key) {
      return this.has(key);
    }
  }]);

  return Callbacks;
}();

exports.Callbacks = Callbacks;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsStrategyProvider = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EventsStrategyProvider = function EventsStrategyProvider(methods) {
  _classCallCheck(this, EventsStrategyProvider);

  _defineProperty(this, "on", void 0);

  _defineProperty(this, "off", void 0);

  this.on = methods.on;
  this.off = methods.off;
};

exports.EventsStrategyProvider = EventsStrategyProvider;
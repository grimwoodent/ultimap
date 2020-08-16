"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IConstructor", {
  enumerable: true,
  get: function get() {
    return _constructor.ICollections;
  }
});
Object.defineProperty(exports, "IStrategy", {
  enumerable: true,
  get: function get() {
    return _strategy.IStrategy;
  }
});
exports.default = void 0;

var _constructor = require("./constructor");

var _strategy = require("./strategy");

var _default = {
  Constructor: _constructor.Collections,
  Strategy: _strategy.Strategy
};
exports.default = _default;
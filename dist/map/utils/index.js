"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uid = exports.falseFn = void 0;

var falseFn = function falseFn() {
  return false;
};

exports.falseFn = falseFn;

var uid = function () {
  var id = 1;

  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  return {
    next: function next() {
      return "".concat(s4()).concat(s4()).concat(s4()).concat(s4()).concat(id++);
    }
  };
}();

exports.uid = uid;
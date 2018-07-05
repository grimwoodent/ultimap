"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constructor = exports.Strategy = void 0;

var _grim = require("grim.lib");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Strategy =
/*#__PURE__*/
function (_Collection$Strategy) {
  _inherits(Strategy, _Collection$Strategy);

  function Strategy() {
    _classCallCheck(this, Strategy);

    return _possibleConstructorReturn(this, _getPrototypeOf(Strategy).apply(this, arguments));
  }

  return Strategy;
}(_grim.Collection.Strategy);

exports.Strategy = Strategy;

var Constructor =
/*#__PURE__*/
function (_Collection$Construct) {
  _inherits(Constructor, _Collection$Construct);

  function Constructor() {
    _classCallCheck(this, Constructor);

    return _possibleConstructorReturn(this, _getPrototypeOf(Constructor).apply(this, arguments));
  }

  return Constructor;
}(_grim.Collection.Constructor);

exports.Constructor = Constructor;
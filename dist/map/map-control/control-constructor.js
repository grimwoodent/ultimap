"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapControlConstructor = void 0;

var _mapControl = require("../drivers/interface/map-control");

var _mapControlInstance = require("./map-control-instance");

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapControlConstructor =
/*#__PURE__*/
function () {
  function MapControlConstructor(strategy) {
    _classCallCheck(this, MapControlConstructor);

    _defineProperty(this, "createInstanceHandler", void 0);

    _defineProperty(this, "strategy", void 0);

    _defineProperty(this, "handler", {
      constructorHandler: null,
      onAddHandler: null,
      onRemoveHandler: null
    });

    if (!strategy) {
      throw new Error('Geo strategy not found');
    }

    this.strategy = strategy;
  }

  _createClass(MapControlConstructor, [{
    key: "setConstructor",
    value: function setConstructor(handler) {
      this.handler.constructorHandler = handler;
      return this;
    }
  }, {
    key: "setOnAddHandler",
    value: function setOnAddHandler(handler) {
      this.handler.onAddHandler = handler;
      return this;
    }
  }, {
    key: "setOnRemoveHandler",
    value: function setOnRemoveHandler(handler) {
      this.handler.onRemoveHandler = handler;
      return this;
    }
    /**
     * Create new control instance
     * @param args
     * @return {Promise<any>}
     */

  }, {
    key: "create",
    value: function create(props) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        try {
          if (!_this.createInstanceHandler) {
            _this.createInstanceHandler = new Promise(function (resolve) {
              _this.getStrategy().getControlInstanceConstructor().then(resolve);
            });
          }

          _this.createInstanceHandler.then(function (getInstanceHandler) {
            var _getInstanceHandler;

            var control = _construct(_mapControlInstance.MapControl, [getInstanceHandler(props, (_getInstanceHandler = {}, _defineProperty(_getInstanceHandler, _mapControl.MAP_CONTROL_EVENTS.ON_ADD, function (parentDomNode) {
              if (_this.handler.onAddHandler) {
                _this.handler.onAddHandler.call(control, control, parentDomNode);
              }
            }), _defineProperty(_getInstanceHandler, _mapControl.MAP_CONTROL_EVENTS.ON_REMOVE, function () {
              if (_this.handler.onRemoveHandler) {
                _this.handler.onRemoveHandler.call(control, control);
              }
            }), _getInstanceHandler)), _this.handler.constructorHandler].concat(args));

            resolve(control);
          }, function () {
            reject('Create Control Error');
          });
        } catch (err) {
          reject(err);
        }
      });
    }
    /**
     * Стратегия работы с картой
     *
     * @return {IMapControlStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy() {
      return this.strategy.mapControl;
    }
  }]);

  return MapControlConstructor;
}();

exports.MapControlConstructor = MapControlConstructor;
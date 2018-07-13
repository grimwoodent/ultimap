"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexMapControlStrategy = void 0;

var _grim = require("grim.lib");

var _ymaps = require("../utils/ymaps");

var _mapControl = require("../../interface/map-control");

var _propsAdapter = require("./props-adapter");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YandexMapControlStrategy =
/*#__PURE__*/
function () {
  function YandexMapControlStrategy() {
    _classCallCheck(this, YandexMapControlStrategy);
  }

  _createClass(YandexMapControlStrategy, [{
    key: "getControlInstanceConstructor",
    value: function getControlInstanceConstructor() {
      return new Promise(function (resolve, reject) {
        if (!_ymaps.Api.ymaps) {
          throw new Error('Yandex maps script not found');
        }

        _ymaps.Api.ymaps.ready(function () {
          var ControlConstructor = function Constructor(props) {
            var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            this.callbacks = new _grim.Callbacks(events);
            ControlConstructor.superclass.constructor.call(this, props);
          };

          _ymaps.Api.ymaps.util.augment(ControlConstructor, _ymaps.Api.ymaps.collection.Item, {
            onAddToMap: function onAddToMap(map) {
              var _this = this;

              ControlConstructor.superclass.onAddToMap.call(this, map);
              this.getParent().getChildElement(this).then(function (parentDomContainer) {
                try {
                  _this.callbacks.trigger(_mapControl.MAP_CONTROL_EVENTS.ON_ADD, parentDomContainer);
                } catch (err) {
                  console.error(err);
                }
              });
            },
            onRemoveFromMap: function onRemoveFromMap(map) {
              this.callbacks.trigger(_mapControl.MAP_CONTROL_EVENTS.ON_REMOVE);
            }
          });

          resolve(function (props, events) {
            var propsAdapter = new _propsAdapter.PropsAdapter(props);
            return new ControlConstructor(propsAdapter.getAdapted(), events);
          });
        }, function (message) {
          throw new Error(message);
        });
      });
    }
  }]);

  return YandexMapControlStrategy;
}();

exports.YandexMapControlStrategy = YandexMapControlStrategy;
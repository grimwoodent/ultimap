"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YandexMapControlStrategy = void 0;

var _ymaps = require("./utils/ymaps");

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
    key: "createConstructor",
    value: function createConstructor(BaseConstructor, onAdd, onRemove) {
      return new Promise(function (resolve, reject) {
        if (typeof onAdd !== 'function' || typeof onRemove !== 'function') {
          throw new Error('Empty constructor/destructor functions');
        }

        if (!_ymaps.Api.ymaps) {
          throw new Error('Yandex maps script not found');
        }

        _ymaps.Api.ymaps.ready(function () {
          var ymapsOptions = {}; // @TODO config this

          var ControlConstructor = function Constructor() {
            var _ref;

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            (_ref = BaseConstructor).call.apply(_ref, [this].concat(args));

            ControlConstructor.superclass.constructor.call(this, ymapsOptions);
          };

          _ymaps.Api.ymaps.util.augment(ControlConstructor, _ymaps.Api.ymaps.collection.Item, {
            onAddToMap: function onAddToMap(map) {
              ControlConstructor.superclass.onAddToMap.call(this, map);
              this.getParent().getChildElement(this).then(function (parentDomContainer) {
                try {
                  onAdd.call(ControlConstructor, parentDomContainer);
                } catch (err) {
                  console.error(err);
                }
              });
            },
            onRemoveFromMap: function onRemoveFromMap(map) {
              onRemove.call(ControlConstructor);
            }
          });

          resolve(function GetInstance() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _construct(ControlConstructor, args);
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
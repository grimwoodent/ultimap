"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletMapControlStrategy = void 0;

var L = _interopRequireWildcard(require("leaflet"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafletMapControlStrategy =
/*#__PURE__*/
function () {
  function LeafletMapControlStrategy() {
    _classCallCheck(this, LeafletMapControlStrategy);
  }

  _createClass(LeafletMapControlStrategy, [{
    key: "createConstructor",
    value: function createConstructor(BaseConstructor, onAdd, onRemove) {
      return new Promise(function (resolve, reject) {
        if (typeof onAdd !== 'function' || typeof onRemove !== 'function') {
          throw new Error('Empty constructor/destructor functions');
        }

        var ControlConstructor = function ControlConstructor() {
          var _ref;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_ref = BaseConstructor).call.apply(_ref, [this].concat(args));
        };

        ControlConstructor.prototype.onAdd = function onAddMapControl(map) {
          try {
            var parentDomContainer = L.DomUtil.create('div');
            onAdd.call(this, parentDomContainer);
            L.DomEvent.disableScrollPropagation(parentDomContainer);
            L.DomEvent.disableClickPropagation(parentDomContainer);
            return parentDomContainer;
          } catch (err) {
            console.error(err);
          }
        };

        ControlConstructor.prototype.onRemove = function onRemoveMapControl(map) {
          onRemove.call(this);
        };

        resolve(function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return new (L.Control.extend(_construct(ControlConstructor, args)))();
        });
      });
    }
  }]);

  return LeafletMapControlStrategy;
}();

exports.LeafletMapControlStrategy = LeafletMapControlStrategy;
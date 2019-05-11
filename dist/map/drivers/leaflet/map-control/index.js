"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafletMapControlStrategy = void 0;

var _grim = require("grim.lib");

var L = _interopRequireWildcard(require("leaflet"));

var _mapControl = require("../../interface/map-control");

var _propsAdapter = require("./props-adapter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    key: "getControlInstanceConstructor",
    value: function getControlInstanceConstructor() {
      return new Promise(function (resolve, reject) {
        var ControlConstructor = function ControlConstructorFn(props) {
          var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          this.props = props || {};
          this.callbacks = new _grim.Callbacks(events);
        };

        ControlConstructor.prototype.onAdd = function onAddMapControl(map) {
          try {
            var parentDomContainer = L.DomUtil.create('div');
            var position = this.props.position;

            if (position) {
              parentDomContainer.style.position = 'inherit';
              parentDomContainer.style.top = position.top || 'auto';
              parentDomContainer.style.bottom = position.bottom || 'auto';
              parentDomContainer.style.left = position.left || 'auto';
              parentDomContainer.style.right = position.right || 'auto';
            }

            this.callbacks.trigger(_mapControl.MAP_CONTROL_EVENTS.ON_ADD, parentDomContainer);
            L.DomEvent.disableScrollPropagation(parentDomContainer);
            L.DomEvent.disableClickPropagation(parentDomContainer);
            return parentDomContainer;
          } catch (err) {
            console.error(err);
          }
        };

        ControlConstructor.prototype.onRemove = function onRemoveMapControl(map) {
          this.callbacks.trigger(_mapControl.MAP_CONTROL_EVENTS.ON_REMOVE);
        };

        resolve(function (props, events) {
          var propsAdapter = new _propsAdapter.PropsAdapter(props);
          var control = new ControlConstructor(propsAdapter.getAdaptedControlProps(), events);
          return new (L.Control.extend(control))(propsAdapter.getAdapted());
        });
      });
    }
  }]);

  return LeafletMapControlStrategy;
}();

exports.LeafletMapControlStrategy = LeafletMapControlStrategy;
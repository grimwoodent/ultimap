"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropsAdapter = void 0;

var _mapControl = require("../../interface/map-control");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropsAdapter =
/*#__PURE__*/
function () {
  function PropsAdapter(props) {
    _classCallCheck(this, PropsAdapter);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "adaptedProps", {});

    _defineProperty(this, "adaptedControlProps", {});

    this.props = props;
    this.adaptPosition();
  }

  _createClass(PropsAdapter, [{
    key: "getAdapted",
    value: function getAdapted() {
      return this.adaptedProps;
    }
  }, {
    key: "getAdaptedControlProps",
    value: function getAdaptedControlProps() {
      return this.adaptedControlProps;
    }
  }, {
    key: "adaptPosition",
    value: function adaptPosition() {
      var position = this.props[_mapControl.MAP_CONTROL_PROPS.POSITION];

      if (position) {
        this.adaptedProps.position = 'custom';
        this.adaptedControlProps.position = {
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          right: position.right
        };
      } else {
        var adaptMap = {
          left: 'topleft',
          right: 'bottomright',
          top: 'topright',
          bottom: 'bottomleft'
        };
        var float = this.props[_mapControl.MAP_CONTROL_PROPS.FLOAT];
        this.adaptedProps.position = adaptMap[float] || adaptMap.left;
      }
    }
  }]);

  return PropsAdapter;
}();

exports.PropsAdapter = PropsAdapter;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapControl = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapControl =
/*#__PURE__*/
function () {
  function MapControl(strategy) {
    _classCallCheck(this, MapControl);

    _defineProperty(this, "ControlConstructor", void 0);

    _defineProperty(this, "strategy", void 0);

    if (!strategy) {
      throw new Error('Geo strategy not found');
    }

    this.strategy = strategy;
  }
  /**
   * Создать конструктор элемента управления
   *
   * @param {() => void} baseConstructor
   * @param {(parentDomContainer: HTMLElement) => void} onAdd
   * @param {() => void} onRemove
   *
   * @return {Promise<any>}
   */


  _createClass(MapControl, [{
    key: "createConstructor",
    value: function createConstructor(baseConstructor, onAdd, onRemove) {
      var _this = this;

      return new Promise(function (resolve) {
        if (!_this.ControlConstructor) {
          _this.ControlConstructor = _this.getStrategy().createConstructor(baseConstructor, onAdd, onRemove);
        }

        resolve(_this.ControlConstructor);
      });
    }
    /**
     * Создать элемент управления по конструктору
     *
     * @param {IMapControlProps} props
     * @param {IMapControlEvents} events
     *
     * @return {Promise<any>}
     */

  }, {
    key: "createControl",
    value: function createControl(props, events) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.ControlConstructor) {
          resolve(new _this2.ControlConstructor(props, events));
        } else {
          reject('Control Constructor doesn`t created');
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

  return MapControl;
}();

exports.MapControl = MapControl;
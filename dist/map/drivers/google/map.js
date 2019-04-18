"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleMapStrategy = void 0;

var _google = require("./utils/google");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GoogleMapStrategy =
/*#__PURE__*/
function () {
  function GoogleMapStrategy() {
    _classCallCheck(this, GoogleMapStrategy);
  }

  _createClass(GoogleMapStrategy, [{
    key: "load",

    /**
     * Load map to element
     * @param {HTMLElement} element
     * @param {ICreateMapStrategyOptions} options
     * @return {Promise<any>}
     */
    value: function load(element, options) {
      return new Promise(function (resolve, reject) {
        if (!_google.Api.google) {
          reject('Google maps script not found');
          return;
        }

        var centerCoords = options.center ? options.center.toLatLng() : null;
        var boundsCenterCoords = options.bounds ? options.bounds.getCenter().toLatLng : null;
        var instance = new _google.Api.google.maps.Map(element, {
          center: centerCoords || boundsCenterCoords,
          zoom: options.zoom
        });
        resolve(instance);
      });
    }
    /**
     * Destroy map instance
     *
     * @param {Map} map
     *
     * @return {Promise<IMapStrategy>}
     */

  }, {
    key: "destroy",
    value: function destroy(map) {
      return null;
    }
  }, {
    key: "setCenter",
    value: function setCenter(map, value) {
      return null;
    }
  }, {
    key: "getCenter",
    value: function getCenter(map) {
      return null;
    }
  }, {
    key: "setZoom",
    value: function setZoom(map, value) {
      return null;
    }
  }, {
    key: "getZoom",
    value: function getZoom(map) {
      return null;
    }
  }, {
    key: "setBounds",
    value: function setBounds(map, value) {
      return null;
    }
  }, {
    key: "getBounds",
    value: function getBounds(map) {
      return null;
    }
  }, {
    key: "fitToViewport",
    value: function fitToViewport(map) {
      return null;
    }
  }, {
    key: "addControl",
    value: function addControl(map, control) {
      return null;
    }
  }, {
    key: "removeControl",
    value: function removeControl(map, control) {
      return null;
    }
  }, {
    key: "on",
    value: function on(geoObject, type, fn, context) {
      return null;
    }
  }, {
    key: "off",
    value: function off(geoObject, type, fn, context) {
      return null;
    }
  }]);

  return GoogleMapStrategy;
}();

exports.GoogleMapStrategy = GoogleMapStrategy;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, null, [{
    key: "load",

    /**
     * Doesnt used
     */
    value: function load() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js';
      document.head.appendChild(script);
    }
  }, {
    key: "google",
    get: function get() {
      return window.google;
    }
  }]);

  return Api;
}();

exports.Api = Api;
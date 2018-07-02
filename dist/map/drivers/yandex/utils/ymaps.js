"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @TODO ymaps @types interface
var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, null, [{
    key: "load",
    value: function load() {
      var script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      document.head.appendChild(script);
    }
  }, {
    key: "ymaps",
    get: function get() {
      return window.ymaps;
    }
  }]);

  return Api;
}();

exports.Api = Api;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Strategy =
/*#__PURE__*/
function () {
  function Strategy() {
    _classCallCheck(this, Strategy);
  }

  _createClass(Strategy, [{
    key: "getIndex",

    /**
     * Get element index in collection
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {number}
     */
    value: function getIndex(collection, element) {
      return collection.findIndex(function (collectionElement) {
        return collectionElement === element;
      });
    }
    /**
     * Is element exist in collection
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(collection, element) {
      return !!~this.getIndex(collection, element);
    }
    /**
     * Add element to collection
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {any[]}
     */

  }, {
    key: "add",
    value: function add(collection, element) {
      if (this.has(collection, element)) {
        return collection;
      }

      return [].concat(collection, element);
    }
    /**
     * Remove element from collection
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {any[]}
     */

  }, {
    key: "remove",
    value: function remove(collection, element) {
      if (!this.has(collection, element)) {
        return collection;
      }

      var idx = this.getIndex(collection, element);
      var result = [].concat(collection);
      result.splice(idx, 1);
      return result;
    }
  }]);

  return Strategy;
}();

exports.Strategy = Strategy;
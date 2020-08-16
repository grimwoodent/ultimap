"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collections = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Collections =
/*#__PURE__*/
function () {
  function Collections(strategies) {
    var _this = this;

    _classCallCheck(this, Collections);

    _defineProperty(this, "strategies", {});

    _defineProperty(this, "storages", {});

    Object.keys(strategies).forEach(function (key) {
      _this.addStrategy(key, strategies[key]);
    });
  }
  /**
   * Replace all elements in collection
   *
   * @param {string} key
   * @param {any[]} elements
   *
   * @return {ICollections}
   */


  _createClass(Collections, [{
    key: "replaceAllIn",
    value: function replaceAllIn(key, elements) {
      this.storages[key] = elements;
      return this;
    }
    /**
     * Add element to collection
     *
     * @param {string} key
     * @param element
     *
     * @return {ICollections}
     */

  }, {
    key: "addTo",
    value: function addTo(key, element) {
      var strategy = this.getStrategy(key);
      var storage = this.getStorage(key);
      this.replaceAllIn(key, strategy.add(storage, element));
      return this;
    }
    /**
     * Remove element from collection
     *
     * @param {string} key
     * @param element
     *
     * @return {ICollections}
     */

  }, {
    key: "removeFrom",
    value: function removeFrom(key, element) {
      var strategy = this.getStrategy(key);
      var storage = this.getStorage(key);
      this.replaceAllIn(key, strategy.remove(storage, element));
      return this;
    }
    /**
     * Is element exist in collection
     *
     * @param {string} key
     * @param element
     *
     * @return {boolean}
     */

  }, {
    key: "hasIn",
    value: function hasIn(key, element) {
      var strategy = this.getStrategy(key);
      var storage = this.getStorage(key);
      return strategy.has(storage, element);
    }
    /**
     * Clear collection
     *
     * @param {string} key
     *
     * @return {ICollections}
     */

  }, {
    key: "clear",
    value: function clear(key) {
      this.replaceAllIn(key, []);
      return this;
    }
    /**
     * Get all elements from collection
     *
     * @param {string} key
     *
     * @return {any[]}
     */

  }, {
    key: "getAllFrom",
    value: function getAllFrom(key) {
      return this.getStorage(key);
    }
    /**
     * Is collection is empty
     *
     * @param {string} key
     *
     * @return {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(key) {
      return !this.getStorage(key).length;
    }
    /**
     * Get all keys of collections
     *
     * @return {string[]}
     */

  }, {
    key: "keys",
    value: function keys() {
      return Object.keys(this.storages);
    }
    /**
     * Add collection strategy
     *
     * @param {string} key
     * @param {IStrategy} strategy
     * @return {ICollections}
     */

  }, {
    key: "addStrategy",
    value: function addStrategy(key, strategy) {
      if (this.strategies[key]) {
        throw new Error("".concat(key, " strategy already exist"));
      }

      this.strategies[key] = strategy;
      this.storages[key] = [];
      return this;
    }
    /**
     * Remove collection strategy
     *
     * @param {string} key
     * @return {ICollections}
     */

  }, {
    key: "removeStrategy",
    value: function removeStrategy(key) {
      if (!this.strategies[key]) {
        throw new Error("".concat(key, " strategy not found"));
      }

      this.strategies[key] = null;
      this.storages[key] = null;
      return this;
    }
    /**
     * Get collection by key
     *
     * @param {string} key
     *
     * @return {any[]}
     */

  }, {
    key: "getStorage",
    value: function getStorage(key) {
      return this.storages[key] || [];
    }
    /**
     * Get strategy for collection by key
     *
     * @param {string} key
     *
     * @return {IStrategy}
     */

  }, {
    key: "getStrategy",
    value: function getStrategy(key) {
      if (!this.strategies[key]) {
        throw new Error("".concat(key, " strategy not found"));
      }

      return this.strategies[key];
    }
  }]);

  return Collections;
}();

exports.Collections = Collections;
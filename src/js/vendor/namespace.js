/**!
 * @author Christian Angermann https://github.com/cange/namespace-js
 * @license MIT
 */
/**
 * @module Namespace
 * @class Namespace
 * @type function
 */
var Namespace = (function (global) {
  'use strict';

  return {

    /**
     * Creates a global object in a single line.
     * @method create
     * @param {String} namespace
     * @example
     *   Namespace.create('foo.bar'); // -> foo.bar
     */
    create: function (namespace) {
      var parent = global,
          parts = namespace.split('.'),
          len = parts.length,
          i = 0,
          part
      ;

      for (; i < len; i++) {
        part = parts[i];
        parent = (parent[part] = parent[part] || {});
      }
    },

    /**
     * Check for global object.
     * @method is
     * @param {String} namespace
     * @return {Boolean}
     * @example
     *   Namespace.is('foo.bar'); // -> false
     *   Namespace.create('foo.bar'); // -> foo.bar
     *   Namespace.is('foo.bar'); // -> true
     */
    is: function (namespace) {
      var parent = global,
          result = false,
          parts = namespace.split('.'),
          len = parts.length,
          i = 0,
          part
      ;
      for (; i < len; i++) {
        part = parts[i];

        if (!parent[part]) {
          result = false;
          return false;
        }
        parent = parent[part];
        result = true;
      }

      return result;
    }

  };

}(this));

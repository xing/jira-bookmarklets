Namespace.create('xing.core');

/**
 * @module xing.core
 * @class TicketCache
 * @requires String
 */
xing.core.TicketCache = function () {
  'use strict';

  var scope = this,
    hostname = location.hostname,
    separator = hostname ? '.' : ''
  ;

  /**
   * Local storage key for ticket caching
   * @property STORAGE_KEY
   * @type String
   * @static
   * @final
   */
  scope.STORAGE_KEY = hostname + separator + 'ticket';

  /**
   * @type Object
   * @property data
   */
  scope.data = {};

  /**
   * Stored the last used ticket.
   * @type Object
   * @property latest
   */
  scope.latest = {};

  /**
   * Would be Triggered by observer
   * @method update
   */
  scope.update = function () {
    scope.data = $.extend(scope.data, scope.latest);
  };

  /**
   * @method get
   * @param {Integer} [index] Index number of the item to be returned
   * @return {Array} List of cached ticket objects
   */
  scope.get = function (index) {
    var cachedTickets = localStorage.getItem(scope.STORAGE_KEY),
        result = cachedTickets && cachedTickets[0] ? JSON.parse(cachedTickets) : []
    ;

    if (index !== undefined && result[index]) {
      result = [result[index]];
    }
    return result;
  };

  /**
   * @method add
   * @param {Object} map
   */
  scope.add = function (map) {
    if (!map) { return; }
    var cachedTickets = scope.get(),
      tickets = cachedTickets.concat([map])
    ;
    localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(tickets));
  };

  /**
   * Remove an ticket from the cached ticket list
   * @method remove
   * @param {Integer} [index] Index number of the item to be returned
   * @return {Array} list of updated cached tickets
   */
  scope.remove = function (index) {
    if (index !== undefined) {
      var cachedTickets = scope.get();
      if (cachedTickets[0]) {
        cachedTickets.splice(index, 1);
        localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(cachedTickets));
      }
    }
    else {
      localStorage.removeItem(scope.STORAGE_KEY);
    }

    return scope.get();
  };

};

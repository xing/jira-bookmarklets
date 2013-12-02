Namespace.create('xing.core');

/**
 * @module xing.core
 * @class DataCollector
 * @requires String
 */
xing.core.DataCollector = function () {
  'use strict';

  var scope = this,
    hostname = location.hostname,
    separator = hostname ? '.' : ''
  ;

  /**
   * Local storage key for collaborartors caching
   * @property COLLABORATOR_KEY
   * @type String
   * @static
   * @final
   */
  scope.COLLABORATOR_KEY = hostname + separator + 'collaborators';
  /**
   * Local storage key for ticket caching
   * @property TICKET_KEY
   * @type String
   * @static
   * @final
   */
  scope.TICKET_KEY = hostname + separator + 'ticket';

  /**
   * List of subscribed observers
   * @property observers
   * @type Array
   */
  scope.observers = [];

  /**
   * @type Object
   * @property ticketData
   */
  scope.ticketData = {};

  /**
   * Stored the last used ticket.
   * @type Object
   * @property lastTicketData
   */
  scope.lastTicketData = {};

  /**
   * @method getCachedTickets
   * @return {Array} List of cached ticket objects
   */
  scope.getCachedTickets = function () {
    var cachedTickets = localStorage.getItem(scope.TICKET_KEY);

    return cachedTickets && cachedTickets[0] ? JSON.parse(cachedTickets) : [];
  };

  /**
   * Register observer objects
   * @method subscribe
   * @param {Object} subscriber
   */
  scope.subscribe = function (subscriber) {
    scope.observers.push(subscriber);
  };

  /**
   * Remove observer objects from the list
   * @method unsubscribe
   * @param {Object} subscriber
   */
  scope.unsubscribe = function (subscriber) {
    var index = scope.observer.indexOf(subscriber);
    if (index >= 0) {
      scope.observers.splice(index);
    }
  };

  /**
   * Trigger all observers to make an update
   * @method update
   * @param {Object} options
   */
  scope.update = function (options) {
    scope.lastTicketData = options;
    scope.ticketData = $.extend(scope.ticketData, options || {});

    scope.observers.forEach(function (observer) {
      observer.update();
    });
  };

  /**
   * @method cacheTicket
   * @param {Object} map
   */
  scope.cacheTicket = function (map) {
    var cachedTickets = scope.getCachedTickets(),
      tickets = cachedTickets.concat([map])
    ;
    localStorage.setItem(scope.TICKET_KEY, JSON.stringify(tickets));
  };

  /**
   * Remove an ticket from the cached ticket list
   * @method removeCachedTickets
   * @param {Integer} itemNumber Number of item in the list.
   * @return {Array} list of updated cached tickets
   */
  scope.removeCachedTickets = function (itemNumber) {
    if (itemNumber !== undefined) {
      var cachedTickets = scope.getCachedTickets();
      if (cachedTickets[0]) {
        cachedTickets.splice(itemNumber, 1);
        localStorage.setItem(scope.TICKET_KEY, JSON.stringify(cachedTickets));
      }
    }
    else {
      localStorage.removeItem(scope.TICKET_KEY);
    }

    return scope.getCachedTickets();
  };

  /**
   * Add/update collaborator list
   * @method addCollaborators
   * @param {String} promptText is displayed in the prompt dialog
   */
  scope.addCollaborators = function (promptText) {
    var collaborators = localStorage.getItem(scope.COLLABORATOR_KEY) || '',
      updatedCollaborators = window.prompt(promptText, collaborators || '')
    ;

    if (updatedCollaborators !== null) {
      localStorage.setItem(scope.COLLABORATOR_KEY, updatedCollaborators);
      this.update({collaborators: updatedCollaborators.toArray()});
    }
  };

};

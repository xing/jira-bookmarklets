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
    separator = hostname ? '.' : 'local.'
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
   * Local storage key for default collaborators
   * @see STORAGE_KEY
   */
  scope.DEFAULT_COLLABORATOR_KEY = hostname + separator + 'default_collaborators';

  /**
   * Default values for temporary tickets
   */
  scope.default = {
    collaborators: localStorage.getItem(scope.DEFAULT_COLLABORATOR_KEY)
  };

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
   * Returns a specific ticket or the list of all tickets.
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

  /**
   * Returns the names of all collaborators
   * @method updateCollaborators
   * @param {Integer} index Position number in the list where the collaborators should be updated.
   * @return {String} A coma separate string. e.g. "Jeffrey Lebowski, Maude, Walter"
   */
  scope.getCollaborators = function (index) {
    var ticket = scope.get(index)[0];

    return (ticket && ticket.collaborators || scope.default.collaborators);
  };

  /**
   * Add/update collaborator list
   * @method updateCollaborators
   * @see getCollaborators
   * @param {String} names A coma separated string with all names. e.g (Jeffrey Lebowski, Maude)
   */
  scope.updateCollaborators = function (index, names) {
    var tickets = scope.get(),
        ticket = tickets[index]
    ;
    if (ticket) {
      tickets[index] = scope._updateProperty(ticket, 'collaborators', names);
      localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(tickets));
    }
    else {
      scope.default.collaborators = names;
      localStorage.setItem(scope.DEFAULT_COLLABORATOR_KEY, names);
      scope._updateProperty(scope.latest, 'collaborators', names);
    }
    scope.update();
  };

  /**
   * @private
   * Update an property value of an cached ticket object
   * @method updateProperty
   * @param {Object} ticket To updating ticket
   * @param {String} key Name of the property
   * @param {Array|Object|String} key Name of the property
   * @return {Object} updated ticket object
   */
  scope._updateProperty = function (ticket, key, value) {
    if (ticket[key] !== undefined) {
      ticket[key] = value;
    }

    return ticket;
  };
};

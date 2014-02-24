Namespace.create('xing.core');

/**
 * @module xing.core
 * @class DataCollector
 * @requires String
 */
xing.core.DataCollector = function () {
  'use strict';

  var scope = this;

  /**
   * List of subscribed observers
   * @property observers
   * @type Array
   */
  scope.observers = [];

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
   */
  scope.update = function () {
    scope.observers.forEach(function (observer) {
      observer.update();
    });
  };

};

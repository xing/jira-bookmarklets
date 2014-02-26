Namespace.create('xing.core');

/**
 * A general observer pattern.
 * All subscriber objects must have the `update()` method.
 * @module xing.core
 * @class Observer
 */
xing.core.Observer = function () {
  'use strict';

  var scope = this;

  /**
   * @private
   * List of subscribed observers
   * @property _observers
   * @type Array
   */
  scope._observers = [];

  /**
   * Register observer objects
   * @method subscribe
   * @param {Object} subscriber
   */
  scope.subscribe = function (subscriber) {
    scope._observers.push(subscriber);
  };

  /**
   * Remove observer objects from the list
   * @method unsubscribe
   * @param {Object} subscriber
   */
  scope.unsubscribe = function (subscriber) {
    var index = scope.observer.indexOf(subscriber);
    if (index >= 0) {
      scope._observers.splice(index);
    }
  };

  /**
   * Trigger all observers to make an update.
   * @method update
   */
  scope.update = function () {
    scope._observers.forEach(function (observer) {
      observer.update();
    });
  };

};

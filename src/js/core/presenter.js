Namespace.create('xing.core');

/**
 * Provides a collection of promises methods.
 * @module xing.jira
 * @class Presenter
 * @requires String
 */
xing.core.Presenter = function () {
  'use strict';

  var scope = this;

  /**
   * Return a replace whitespace in a string to dashes.
   * @public
   * @method dashalizer
   * @return {String} 'Foo Bar' => 'foo-bar'
   */
  scope.dashalizer = function (string) {
    return string.toLowerCase().replace(/ /g, '-');
  };

  /**
   * @public
   * @method getString
   * @return {String} Promise get always a string
   */
  scope.getString = function (string) {
    return (string || '').trimWhitespace();
  };

  /**
   * @public
   * @method getDate
   * @param {String} timestamp
   * @return {String} a formatted date like '2013-11-12'
   */
  scope.getDate = function (timestamp) {
    var formattedDate = '',
      date, m, Y, d
    ;

    if (timestamp) {
      date = new Date(timestamp);
      m = date.getMonth() + 1;
      m = m > 9 ? m : '0' + m;
      Y = date.getFullYear();
      d = date.getDate();
      formattedDate = Y + '-' + m + '-' + d;
    }

    return formattedDate;
  };

  /**
   * @public
   * @method getStorageItem
   * @return {Array}
   */
  scope.getStorageItem = function (key) {
    var item = localStorage.getItem(key) || '';

    return item.toArray();
  };
  /**
   * @public
   * @method getElementText
   * @return {String}
   */
  scope.getElementText = function ($el) {
    return $el[0] ? $el.text().trimWhitespace() : '';
  };

};

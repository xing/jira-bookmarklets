Namespace.create('xing.jira.helpers');

/**
 * @module xing.jira.helpers
 * @class Label
 * @type function
 */
xing.jira.helpers.Label = function () {
  'use strict';

  var scope = this;

  /**
   * @property NAMESPACE
   * @type String
   * @static
   */
  scope.NAMESPACE = 'aui-lozenge';

  /**
   * @property DEFAULT_LABEL_SELECTORS
   * @type String
   * @static
   */
  scope.DEFAULT_LABEL_SELECTORS = 'aui-lozenge aui-lozenge-subtle';

  /**
   * Style mapping for of the common issue types.
   * @property DEFAULT_TYPES
   * @type Object
   * @static
   */
  scope.DEFAULT_TYPES = {
    'bug':         'error',
    'improvement': 'success',
    'new-feature': 'complete',
    'task':        'moved'
  };

  /**
   * Greenhopper/Jira Agile issue types
   * @property AGILE_TYPES
   * @type Object
   * @static
   */
  scope.AGILE_TYPES = {
    'user-story':           'success',
    'technical-story':      'success',
    'highlevel-testcase':   'current',
    'portability-testcase': 'current'
  };

  /**
   * Returns a lozenges label specific selector.
   * @method getSelector
   * @param {String} type An ticket specific type selector (e.g. bug, user-story etc.).
   * @return {String}
   */
  scope.getSelector = function (type) {
    var result;
    if (type === false) {
      return '';
    }

    result = scope._filter(type, scope.DEFAULT_TYPES);
    result += scope._filter(type, scope.AGILE_TYPES);

    return scope.DEFAULT_LABEL_SELECTORS + (result ? ' ' + result : '');
  };

 /**
  * @method _filter
  * @param {String} type
  * @param {DEFAULT_TYPES|AGILE_TYPE} typeMap
  * @return {String}
  */
  scope._filter = function (type, typeMap) {
    var result = '';
    Object.keys(typeMap).forEach(function (key) {
      if (type === key) {
        result = scope.NAMESPACE + '-' + typeMap[key];
      }
    });
    return result;
  };

};

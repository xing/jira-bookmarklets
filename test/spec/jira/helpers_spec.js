describe('xing.jira.helpers.Label', function () {
  'use strict';

  var subject, expected, actual;

  describe('getSelector()', function () {
    beforeEach(function () {
      subject = new xing.jira.helpers.Label();
    });

    it('returns default value if no param exist', function () {
      actual = subject.getSelector();
      expected = subject.DEFAULT_LABEL_SELECTORS;

      expect(actual).toEqual(expected);
    });

    it('returns default value if no key is matching', function () {
      actual = subject.getSelector('awesomeness');
      expected = subject.DEFAULT_LABEL_SELECTORS;

      expect(actual).toEqual(expected);
    });

    it('returns nothing if param is false', function () {
      actual = subject.getSelector(false);
      expected = '';

      expect(actual).toEqual(expected);
    });

    it('returns specific value if a key is matching', function () {
      actual = subject.getSelector('bug');
      expected = subject.DEFAULT_LABEL_SELECTORS + ' ' +
                 subject.NAMESPACE + '-' + subject.DEFAULT_TYPES['bug']
      ;

      expect(actual).toEqual(expected);
    });

  });

});

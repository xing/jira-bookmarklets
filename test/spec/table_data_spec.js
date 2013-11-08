describe('TableData', function () {
  'use strict';

  var subject, expected, actual;
  var data, layoutNameSpy;

  beforeEach(function () {
    layoutNameSpy = 'spy';
    subject = new xing.core.table.Map(new xing.jira.TableMapCell(), layoutNameSpy);
  });

  describe('build()', function () {
    beforeEach(function () {
      data = {number: 'x-1', title: 'bam', reporter: 'tim'};
      xing.core.table.layout._layouts[layoutNameSpy] = [['number'], ['title', 'reporter']];
    });

    it('return a proper table map', function () {
      actual = subject.build(data, xing.core.table.layout.get(layoutNameSpy));
      expected = [ [ { head : true, cell : { options : { colspan : 2, cssClass : 'gm-number gm-ltr' }, body : { text : 'x-1', options : { cssClass : 'h1', title : 'x-1' } } } } ], [ { head : true, cell : { options : { colspan : 5, cssClass : 'gm-title gm-ltr' }, body : { text : 'bam', options : { cssClass : 'h2 gm-hyphen' } } } }, { cell : { title : { text : 'Reporter' }, body : { text : 'tim' } } } ] ];

      expect(actual).toEqual(expected);
    });

  });

});

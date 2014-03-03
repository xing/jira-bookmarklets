describe('xing.core.table.Map', function () {
  'use strict';

  var subject, expected, actual;

  describe('build()', function () {

    describe('general parameter handling', function () {
      var data;

      beforeEach(function () {
        var localStub = { ticket: { number: '', title: '', reporter: { title: 'Reporter' } } };
        subject = new xing.core.table.Map(new xing.jira.TableMapCell(), localStub);
        data = {number: 'x-1', title: 'bam', reporter: 'tim'};
        spyOn(xing.core.table.layout, 'get').and.returnValue( [ [ 'number' ], [ 'title', 'reporter' ] ] );
      });

      it('return a proper table map', function () {
        actual = subject.build(data);
        expected = [ [ { head : true, cell : { options : { colspan : 2, cssClass : 'gm-jira-number' }, body : { text : 'x-1', options : { title : 'x-1' } } } } ], [ { head : true, cell : { options : { colspan : 5, cssClass : 'gm-jira-title' }, body : { text : 'bam' } } }, { cell : { options : { cssClass : 'gm-jira-reporter' }, title : { text : 'Reporter' }, body : { text : 'tim' } } } ] ];

        expect(actual).toEqual(expected);
      });

    });

    describe('complex parameter handling', function () {
      var map, data;

      var tableCellStub = {
        field: function (value) {
          return value;
        }
      };

      beforeEach(function () {
        var localStub = { ticket: '' };
        subject = new xing.core.table.Map(tableCellStub, localStub);
        data = { field: '01234' };
      });

      it('should be possible to handle a single level map', function () {
        map = [ 'field' ];

        expected = [{data: {field: '01234'}, local: ''}];
        actual = subject.build(data, map);

        expect(actual).toEqual(expected);
      });

      it('should be possible to handle a multi level map', function () {
        map = [ [ 'field' ] ];

        expected = [ [ {data: {field: '01234'}, local: ''} ] ];
        actual = subject.build(data, map);

        expect(actual).toEqual(expected);
      });

      it('should be possible to handle a parameterized map', function () {
        map = [ {field: {maxLength: 4} } ];

        expected = [ {data: {field: '012…'}, local: ''} ];
        actual = subject.build(data, map);

        expect(actual).toEqual(expected);
      });

    });

  });

});

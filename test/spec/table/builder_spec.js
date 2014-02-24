describe('table.Builder', function () {
  'use strict';

  var subject, expected, actual;

  beforeEach(function () {
    subject = new xing.core.table.Builder();
  });

  describe('_text()', function () {
    it('returns value of "text" property when is given', function () {
      var stub = {text: 'bam'};
      expected = 'bam';
      actual = subject._text(stub);

      expect(expected).toEqual(actual);
    });

    it('returns a empty string when no "text" property is given', function () {
      var stub = {};
      expected = '';
      actual = subject._text(stub);

      expect(expected).toEqual(actual);
    });
  });

  describe('_addCssClass()', function () {
    var tag;
    beforeEach(function () {
      tag = {options: {}};
    });

    it('create an class property if no exists', function () {
      expected = ' class=" bar"';
      actual = subject._addCssClass(tag, 'bar');

      expect(expected).toEqual(actual);
    });

    it('merge the new selector to a existing value', function () {
      tag = {options: {cssClass: 'foo'}};
      expected = ' class="foo bar"';
      actual = subject._addCssClass(tag, 'bar');

      expect(expected).toEqual(actual);
    });

  });

  describe('row()', function () {
    var rowStub = [{cell:{}}];
    it('returns an "<tr>" element', function () {
      expected = '<tr><td><div class="gm-inner"></div></td></tr>';
      actual = subject.row(rowStub);

      expect(expected).toEqual(actual);
    });

  });

  describe('cell()', function () {
    var cellStub;
    it('returns an "<th>" element when "head" is true', function () {
      cellStub = {
        head: true,
        cell: {}
      };
      expected = '<th><div class="gm-inner"></div></th>';
      actual = subject.cell(cellStub);

      expect(expected).toEqual(actual);
    });

    it('returns an "<td>" element when "head" is true', function () {
      cellStub = {
        cell: {}
      };
      expected = '<td><div class="gm-inner"></div></td>';
      actual = subject.cell(cellStub);

      expect(expected).toEqual(actual);
    });

    it('returns head element when "title" text is given', function () {
      cellStub = {
        cell: {
          title: {
            text: 'bam',
            options: {cssClass: 'selector'}
          }
        }
      };
      expected = '<td><div class="gm-inner"><div class="selector gm-hd">bam</div></div></td>';
      actual = subject.cell(cellStub);

      expect(expected).toEqual(actual);
    });

    it('returns body element when "body" text is given', function () {
      cellStub = {
        cell: {
          body: {
            text: 'bam',
            options: {cssClass: 'selector'}
          }
        }
      };
      expected = '<td><div class="gm-inner"><div class="selector gm-bd">bam</div></div></td>';
      actual = subject.cell(cellStub);

      expect(expected).toEqual(actual);
    });

  });

  describe('render()', function () {

    it('returns a plain table wrapper by default', function () {
      var tableDataStub = [];

      actual = subject.render(tableDataStub);
      expected = '<table class="gm-table"></table>';

      expect(actual).toEqual(expected);
    });

    it('returns a table wrapper with a specific class selector when given', function () {
      var tableDataStub = [],
          className = 'test-class',
          options = {layoutName: className}
      ;
      actual = subject.render(tableDataStub, options);
      expected = '<table class="gm-table gm-' + className + '-layout"></table>';

      expect(actual).toEqual(expected);
    });

  });

});

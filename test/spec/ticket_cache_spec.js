describe('TicketCache', function () {
  'use strict';

  var subject, expected, actual;

  beforeEach(function () {
    subject = new xing.core.TicketCache();
  });

  afterEach(function () {
    // clear storage
    subject.remove();
  });

  describe('get()', function () {

    it('returns an empty array if no item exists', function () {
      actual = subject.get();
      expected = [];

      expect(actual).toEqual(expected);
    });

    it('returns an second item in the cache', function () {
      subject.add({a:'b'});
      subject.add({c:'d'});
      expected = [{c:'d'}];
      actual = subject.get(1);

      expect(actual).toEqual(expected);
    });

  });

  describe('add()', function () {

    it('do nothing if no item exists', function () {
      subject.add();
      expected = [];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

    it('add an item in a array if a item exists', function () {
      subject.add({a:'b'});
      expected = [{a:'b'}];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

  });

  describe('remove()', function () {

    beforeEach(function () {
      subject.add({a:'b'});
      subject.add({c:'d'});
      subject.add({f:'g'});
    });

    it('remove the first item in the cache', function () {
      subject.remove(0);
      expected = [{c:'d'}, {f:'g'}];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

    it('remove the last item in the cache', function () {
      subject.remove(2);
      expected = [{a:'b'}, {c:'d'}];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

    it('remove the all items the in cache if no argument given', function () {
      subject.remove();
      expected = [];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

  });

});

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

    it('add an item in a array if a item is given', function () {
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

    it('remove the all items the in cache if no argument exists', function () {
      subject.remove();
      expected = [];
      actual = subject.get();

      expect(actual).toEqual(expected);
    });

  });

  describe('getCollaborator()', function () {

    var names;
    afterEach(function () {
      subject.remove();
    });

    it('returns the default list when no param is given', function () {
      names = 'Walter, Donny';
      subject.default.collaborators = names;

      actual = subject.getCollaborators();
      expected = names;

      expect(actual).toEqual(expected);
    });

    it('returns a string of names when an proper param is given', function () {
      names = 'Jeffrey Lebowski, Maude';
      subject.add({a: 'b', collaborators: names});

      actual = subject.getCollaborators(0);
      expected = names;

      expect(actual).toEqual(expected);
    });

  });

  describe('updateCollaborator()', function () {

    afterEach(function () {
      subject.remove();
    });

    it('add a name to the list', function () {
      var names = 'Jeffrey';
      subject.add({a: 'b', collaborators: ''});
      subject.updateCollaborators(0, names);
      actual = subject.get();
      expected = [{a: 'b', collaborators: names}];

      expect(actual).toEqual(expected);
    });

  });

  describe('_updateProperty()', function () {

    var dummyTicket;

    beforeEach(function () {
      dummyTicket = {'blubber':'bam'};
    });

    it('do nothing if property name not exists', function () {
      actual = subject._updateProperty(dummyTicket, 'foo', 'bar');
      expected = dummyTicket;

      expect(actual).toEqual(expected);
    });

    it('update value property', function () {
      actual = subject._updateProperty(dummyTicket, 'blubber', 'bar');
      expected = {'blubber':'bar'};

      expect(actual).toEqual(expected);
    });

  });

});

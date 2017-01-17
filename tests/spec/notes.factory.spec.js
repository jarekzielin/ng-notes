(function(){
  'use strict';

  describe('Notes factory:', function () {

    beforeEach(module('notesApp'));

    it('Can get an instance', inject(function(Notes) {
      expect(Notes).toBeDefined();
    }));

    describe('Should', function(){
      var
        store = {},
        ls, notes, note;

      ls = function() {
        return JSON.parse(store.notes);
      };
      notes = [
        'Cook dinner',
        'Pay bills'
      ];
      note = 'Cook dinner';

      beforeEach(function () {
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
          return store[key];
        });

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
          store[key] = value + '';
        });

        spyOn(localStorage, 'clear').and.callFake(function () {
          store = {notes:'[]'};
        });
      });

      afterEach(function () {
        store = {notes:'[]'};
      });

      it('be empty data structure at the beginning', function() {
        inject(function(Notes) {
          expect(Notes.query().$$state.value).toEqual([]);
        });
      });

      it('get notes by query method', function(){
        localStorage.setItem('notes', JSON.stringify(notes));

        inject(function(Notes){
          var note = Notes.query().$$state.value;
          expect(note.length).toEqual(2);
          expect(note[0]).toEqual('Cook dinner');
          expect(note[1]).toEqual('Pay bills');
        });
      });

      it('add note by save method', function(){
        inject(function(Notes){
          Notes.save(note);
          expect(ls().length).toEqual(1);
          expect(ls()[0]).toEqual('Cook dinner');
        });
      });

      it('edit note by update method', function(){
        localStorage.setItem('notes', JSON.stringify(notes));

        inject(function(Notes){
          Notes.update(1, 'Have fun');
          expect(ls().length).toEqual(2);
          expect(ls()[0]).toEqual('Cook dinner');
          expect(ls()[1]).toEqual('Have fun');
        });
      });

      it('delete note by remove method', function(){
        localStorage.setItem('notes', JSON.stringify(notes));

        inject(function(Notes){
          Notes.remove(1);
          expect(ls().length).toEqual(1);
          expect(ls()[0]).toBeDefined();
          expect(ls()[1]).toBeUndefined();
        });
      });

      it('clear all notes by remove method', function(){
        localStorage.setItem('notes', JSON.stringify(notes));

        inject(function(Notes){
          Notes.remove();
          expect(ls().length).toBe(0);
          expect(ls()[0]).toBeUndefined();
          expect(ls()[1]).toBeUndefined();
        });
      });
    });
  });
})();

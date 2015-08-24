(function(){
  'use strict'

  angular
    .module('notesApp')
    .factory('Notes', Notes);

  Notes.$inject = ['$q'];

  function Notes($q){

    var factory = {
      save: save,
      query: query,
      update: update,
      remove: remove
    };

    return factory;

    // Create
    function save(note){
      var deferred = $q.defer();
      try {
        var notes = allNotes();
        notes.push(note);
        updateLocalStorage(notes);
        deferred.resolve(notes);
      } catch (err) {
        deferred.reject();
      }
      return deferred.promise;
    };

    // Read
    function query(){
      var deferred = $q.defer();
      try {
        var notes = allNotes();
        deferred.resolve(notes);
      } catch (err) {
        deferred.reject();
      }
      return deferred.promise;
    };

    // Update
    function update(index, note){
      var deferred = $q.defer();
      try {
        var notes = allNotes();
        notes[index] = note;
        updateLocalStorage(notes);
        deferred.resolve(notes);
      } catch (err) {
        deferred.reject();
      }
      return deferred.promise;
    };

    // Delete
    function remove(index){
      var deferred = $q.defer();
      try {
        if(index !== undefined){
          var notes = allNotes();
          notes.splice(index, 1);
          updateLocalStorage(notes);
        } else {
          localStorage.clear();
        }
        deferred.resolve();
      } catch (err) {
        deferred.reject();
      }
      return deferred.promise;
    };

    //

    function allNotes(){
      var ls = localStorage.getItem('notes');
      return (ls !== undefined && ls !== null) ? JSON.parse(ls) : [];
    };

    function updateLocalStorage(notes){
      localStorage.setItem('notes', JSON.stringify(notes));
    };
  };

})();

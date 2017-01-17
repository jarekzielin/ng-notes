(function(){
  'use strict';

  angular
    .module('notesApp')
    .controller('notesCtrl', notesCtrl);

  notesCtrl.$inject = ['Notes'];

  function notesCtrl(Notes) {

    /*jshint validthis: true */
    var vm = this;

    vm.save = save;
    vm.update = update;
    vm.remove = remove;
    vm.clear = clear;

    vm.editMode = false;
    vm.openEdit = openEdit;
    vm.back = back;

    vm.notes = [];

    Notes.query().then(function(data){
      vm.notes = data;
      console.log('Success: notes have been read');
      return vm.notes;
    }, function(){
      console.log('Failed: query error');
    });

    function save(){
      var note = vm.note.trim();

      if (!note) {
        return;
      }

      Notes.save(note).then(function(){
        vm.notes.push(note);
        vm.note = '';
        console.log('Success: note has been saved');
      }, function(){
        console.log('Failed: save error');
      });
    }

    function update(){
      var note = vm.editText.trim();

      if (!note) {
        return;
      }

      Notes.update(vm.editIndex, note).then(function(){
        vm.notes[vm.editIndex] = note;
        vm.editText = '';
        vm.editMode = !vm.editMode;
        console.log('Success: note has been updated');
      }, function(){
        console.log('Failed: update error');
      });
    }

    function remove(index){
      Notes.remove(index).then(function(){
        vm.notes.splice(index, 1);
        console.log('Success: note has been removed');
      }, function(){
        console.log('Failed: remove error');
      });
    }

    function clear(){
      Notes.remove().then(function(){
        vm.notes.length = 0;
        console.log('Success: all notes have been removed');
      }, function(){
        console.log('Failed: clear error');
      });
    }

    function openEdit(index){
      vm.editMode = !vm.editMode;
      vm.editText = vm.notes[index];
      vm.editIndex = index;
    }

    function back(){
      vm.editMode = !vm.editMode;
    }

  }
})();

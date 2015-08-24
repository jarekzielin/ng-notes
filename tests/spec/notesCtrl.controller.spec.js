(function(){
  'use strict'
  describe('notesCtrl controller:', function () {
    var
      scope,
      controller,
      vm;

    beforeEach(module('notesApp'));

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller;
    }));

    beforeEach(inject(function () {
      vm = controller('notesCtrl', { $scope: scope });
    }));

    afterEach(inject(function(){
      vm.clear();
    }));

    describe('vm.notes', function(){
      it('should be an empty list on start', function () {
        expect(vm.notes).toEqual([]);
        expect(vm.notes.length).toEqual(0);
      });
    });

    describe('vm.save()', function(){
      it('should not allow to save an empty note', function () {
        vm.note = '';
        vm.save();
        scope.$digest();
        expect(vm.notes.length).toEqual(0);
      });
    });

    describe('vm.save()', function(){
      it('should save a note with content', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        expect(vm.notes.length).toEqual(1);
      });
    });

    describe('vm.remove(index)', function(){
      it('should remove a note', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        expect(vm.notes.length).toEqual(1);
        vm.remove(0);
        scope.$digest();
        expect(vm.notes.length).toEqual(0);
      });
    });

    describe('vm.clear()', function(){
      it('should remove all notes', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        vm.note = 'Cook dinner';
        vm.save();
        scope.$digest();
        expect(vm.notes.length).toEqual(2);
        vm.clear();
        scope.$digest();
        expect(vm.notes.length).toEqual(0);
      });
    });

    describe('vm.update()', function(){
      it('should update a note', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        expect(vm.notes[0]).toEqual('Have fun');

        vm.editIndex = 0;
        vm.editText = 'Have fun again';
        vm.update();
        scope.$digest();
        expect(vm.notes[0]).toEqual('Have fun again');
      });
    });

    describe('vm.update()', function(){
      it('should not update an empty note', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        expect(vm.notes[0]).toEqual('Have fun');

        vm.editIndex = 0;
        vm.editText = '';
        vm.update();
        scope.$digest();
        expect(vm.notes[0]).toEqual('Have fun');
      });
    });

    describe('vm.editMode', function(){
      it('should have a properly init value', function () {
        expect(vm.editMode).toBe(false);
      });
    });

    describe('vm.back()', function(){
      it('should negate editMode value', function () {
        vm.editMode = false;
        vm.back();
        expect(vm.editMode).toBe(true);
      });
    });

    describe('vm.openEdit()', function(){
      it('should switch to edit mode and assign the indicated text to edit form', function () {
        vm.note = 'Have fun';
        vm.save();
        scope.$digest();
        vm.note = 'Cook dinner';
        vm.save();
        scope.$digest();

        vm.editMode = false;
        vm.openEdit(1);
        
        expect(vm.editIndex).toBe(1);
        expect(vm.editText).toBe('Cook dinner');
        expect(vm.editMode).toBe(true);
      });
    });
  });
})();

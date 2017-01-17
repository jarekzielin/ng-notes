(function(){
  'use strict';

  describe('Filter', function() {

    beforeEach(module('notesApp'));

    describe('images', function() {

      var text;

      it('should retrieve images urls from text and store them into array', function() {
        inject(function(imagesFilter) {
          text = 'Cook dinner https://ag.purdue.edu/agcomm/PublishingImages/TopStory/Turkey-dinner.jpg';
          expect(imagesFilter(text)).toEqual(['https://ag.purdue.edu/agcomm/PublishingImages/TopStory/Turkey-dinner.jpg']);
        });
      });

      it('should retrieve only images urls', function() {
        inject(function(imagesFilter) {
          text = 'Cook dinner https://ag.purdue.edu/agcomm/PublishingImages/TopStory/Turkey-dinner.jpg on http://www.cookinglight.com/food/everyday-menus/dinner-tonight-quick-easy-meals';
          expect(imagesFilter(text)).toEqual(['https://ag.purdue.edu/agcomm/PublishingImages/TopStory/Turkey-dinner.jpg']);
        });
      });

      it('should return an empty array if text does not contain any valid images url', function() {
        inject(function(imagesFilter) {
          text = 'Cook dinner';
          expect(imagesFilter(text)).toEqual([]);
          text = 'Cook dinner on http://www.cookinglight.com/food/everyday-menus/dinner-tonight-quick-easy-meals';
          expect(imagesFilter(text)).toEqual([]);
        });
      });

      it('should retrieve images urls from different URI', function() {
        inject(function(imagesFilter) {
          text = '1. http://www.example.com/img.jpg, 2. https://www.example.com/img.jpg, 3. ftp://www.example.com/img.jpg, 4. //www.example.com/img.jpg, 5. www.example.com/img.jpg, 6. example.com/img.jpg, 2. www.example.com/img.jpg?id=1';
          expect(imagesFilter(text)).toEqual([
            'http://www.example.com/img.jpg',
            'https://www.example.com/img.jpg',
            'ftp://www.example.com/img.jpg',
            'www.example.com/img.jpg',
            'www.example.com/img.jpg',
            'example.com/img.jpg',
            'www.example.com/img.jpg?id=1'
          ]);
        });
      });

    });
  });

})();

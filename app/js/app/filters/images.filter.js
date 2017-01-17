(function(){
  'use strict';

  angular
    .module('notesApp')
    .filter('images', imagesFilter);

  function imagesFilter() {
    return function(input){
      var
        imgURLArray = [],
        matchArray,
        regexURI = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig,
        regexImg = /\.(gif|jpg|jpeg|tiff|png)$/i,
        imgFile,
        imgURL;

      while((matchArray = regexURI.exec(input)) !== null) {
        imgURL = matchArray[0];
        imgFile = imgURL.split('?')[0];
        if(imgFile.match(regexImg)) {
          imgURLArray.push(imgURL);
        }
      }

      return imgURLArray;
    };
  }
})();
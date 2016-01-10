'use strict';

describe('Directive: osbMangaReader', function () {

  // load the directive's module and view
  beforeEach(module('oneStepBeyondApp'));
  beforeEach(module('app/osbMangaReader/osbMangaReader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<osb-manga-reader></osb-manga-reader>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});

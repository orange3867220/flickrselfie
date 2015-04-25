//'use strict';

describe('Service: FlickrSearchService', function () {

  // load the service's module
  beforeEach(module('flickrApp'));

  // instantiate service
  var flickrSearchService, authRequestHandler, createService;
  beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json')
      .respond({"photos":{"page":2,"pages":13519,"perpage":100,"total":"1351816","photo":[{"id":"16641825503","owner":"127098811@N02","secret":"02b4b1342f","server":"8740","farm":9,"title":"golden sunset","ispublic":1,"isfriend":0,"isfamily":0},{"id":"16639576014","owner":"127098811@N02","secret":"e31ec66f67","server":"7635","farm":8,"title":"blue skies 2","ispublic":1,"isfriend":0,"isfamily":0},{"id":"17074270858","owner":"127098811@N02","secret":"c82de0a832","server":"7615","farm":8,"title":"blue skies","ispublic":1,"isfriend":0,"isfamily":0},{"id":"17074237138","owner":"60899162@N07","secret":"a510df1dda","server":"7599","farm":8,"title":"Brisbane - Anzac Day","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"});

     // The $controller service is used to create instances of controllers
     /*var $service = $injector.get('$service');

     createService = function() {
       return $service('flickrSearchService', {FLICKRKEY: 'aa'});
     };*/
   }));
  beforeEach(inject(function(_flickrSearchService_) {
    flickrSearchService = _flickrSearchService_;
  }));

  //Single Fuction Unit test
  describe('Single Function', function(){
    //
    // parseSearchUrl test case
    //
    it('Parse url for search with empty input', function(){
        $httpBackend.expectGET('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=aa&format=json&nojsoncallback=1');

        //var service = createService();
        flickrSearchService.search();

        $httpBackend.flush();
    });

  });
});

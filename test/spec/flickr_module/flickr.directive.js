
describe('Directive: flickrPhotos', function () {

  // load the service's module
  beforeEach(module('flickrApp'));

  // instantiate service
  var flickrSearchService, authRequestHandler, 
      createController, $httpBackend, $rootScope;  

  beforeEach(inject(function($injector, _flickrSearchService_) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('GET', 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1')
      .respond({"photos":{"page":1,"pages":13519,"perpage":100,"total":"1351816","photo":[{"id":"16641825503","owner":"127098811@N02","secret":"02b4b1342f","server":"8740","farm":9,"title":"golden sunset","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"});

    $httpBackend.when('GET', 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&tags=selfie&page=1')
      .respond({"photos":{"page":1,"pages":13519,"perpage":100,"total":"1351816","photo":[{"id":"16641825503","owner":"127098811@N02","secret":"02b4b1342f","server":"8740","farm":9,"title":"golden sunset","ispublic":1,"isfriend":0,"isfamily":0},{"id":"16639576014","owner":"127098811@N02","secret":"e31ec66f67","server":"7635","farm":8,"title":"blue skies 2","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"});

    //Inject service and scope to initiate controller
    flickrSearchService = _flickrSearchService_;
    $rootScope = $injector.get('$rootScope');
    
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('flickrPhotosCon', {'$scope' : $rootScope , 'flickrSearchService': flickrSearchService});
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  //Single Fuction Unit test
  describe('Single Function', function(){
    //Connection properly
    it('It should pharse proper url and make get request', function(){
        $httpBackend.expectGET('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1');

        //var controller = createController();
        //$rootScope.searchByTags();
        flickrSearchService.search();

        $httpBackend.flush();
    });

    //Connection properly with parameters through controller
    it('It should pharse proper url with parameters through controller', function(){
        $httpBackend.expectGET('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&tags=selfie&page=1');

        var controller = createController();
        $rootScope.tags= 'selfie';
        $rootScope.page = 1;
        $rootScope.searchByTags();

        $httpBackend.flush();
    });

    //should load response properly
    it('It should load response properly', function(){
        $httpBackend.expectGET('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&tags=selfie&page=1');

        var controller = createController();
        $rootScope.tags= 'selfie';
        $rootScope.page = 1;
        $rootScope.searchByTags();
        
        $httpBackend.flush();
        
        expect($rootScope.status).toEqual('ok');
        expect($rootScope.page).toEqual(2);
        expect($rootScope.photos.length).toEqual(2);
    });

  });
});

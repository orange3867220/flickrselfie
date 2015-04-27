'use strict';

describe('Service: FlickrSearchService', function () {

  // load the service's module
  beforeEach(module('flickrApp'));

  // instantiate service
  var flickrSearchService;
  beforeEach(inject(function (_flickrSearchService_) {
    flickrSearchService = _flickrSearchService_;
  }));

  //Single Fuction Unit test
  describe('Single Function', function(){
    //
    // parseSearchUrl test case
    //
    it('Parse url for search with empty input', function(){
      expect(flickrSearchService.parseSearchUrl({}))
        .toEqual('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1');
    });

    it('Parse url for search with simple input', function(){
      expect(flickrSearchService.parseSearchUrl({page:1}))
        .toEqual('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&page=1');
    });

    it('Parse url for search with array input', function(){
      expect(flickrSearchService.parseSearchUrl({tags:['selfie', 'pretty']}))
        .toEqual('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&tags=selfie,pretty');
    });
    
    it('Parse url for search with mixed input', function(){
      expect(flickrSearchService.parseSearchUrl({tags:['selfie', 'pretty'], page:3}))
        .toEqual('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=19ecebef2255e448b878978920cca6be&format=json&nojsoncallback=1&tags=selfie,pretty&page=3');
    });
  });
});

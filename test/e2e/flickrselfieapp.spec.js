
describe('Acceptance Test: flickrselfieApp', function () {

  // load the service's module
  //beforeEach(module('flickrApp'));
  //beforeEach(module('flickrselfieApp'));

  browser.get('http://localhost:9001/');
  
  it('Pageload: it should open with a title', function() {
    expect(browser.getTitle()).toEqual('flickrselfie');
  });
});

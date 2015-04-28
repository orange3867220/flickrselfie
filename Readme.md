# Exercise for fetching flickr photos by tags

### Based on Angularjs, Bootstrap, jQuery
### Running with Bower, Grunt
### Limited test script run by Karma
### Build Based on Yeoman angular-generator

####Flickr Module is wrapped with a directive and a service.
Dirctive **flickrPhotos** is used to handle render and logic with its controller.
Service **flickrSearchService** is used to handle request to flickr.

####Tag search
Seperate tag by comma.

####Responsive design
Page should be mobile friendly and responsive.

####Infinite Scroll
Scroll to bottom should automatically load more.

####Predict select
Predict from 100 most popular searching tags and provide selection.

=========================================================================

######After restore bower and npm dependencies.
######Use **grunt serve** to see development build.
######Use **grunt test** to see test result.
######Use **grunt build** to build production version, which will sits in **dist** folder.
######Can access dist folder through your localhost or put dist folder content in AWS cloud front for global cdn.

=========================================================================
####Future improve
Could use user localstorage and add new tags into prediction list to generate a user customised list.

######Protractor testing failed. Abort for now.

var clientApp = angular.module('clientApp', ['ngFileUpload', 'ngMaterial', 'ng-currency']);

clientApp.config( function( $mdThemingProvider) {

  $mdThemingProvider.theme('default')
  .primaryPalette('light-blue', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '800' // use shade 600 for the <code>md-hue-2</code> class
  })
  .backgroundPalette('grey', {
               'default': '200'
               })
  .accentPalette('deep-orange', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '800' // use shade 600 for the <code>md-hue-2</code> class
  });

});

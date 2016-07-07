var clientApp = angular.module('clientApp', ['ngMaterial', 'ng-currency', 'jkAngularCarousel']);

clientApp.config( function( $mdThemingProvider) {

  $mdThemingProvider.theme('default')
  .primaryPalette('light-blue', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '800' // use shade 600 for the <code>md-hue-2</code> class
  })
  .accentPalette('deep-orange', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '800' // use shade 600 for the <code>md-hue-2</code> class
  });
  console.log('Hey Buckaroo!');

});
